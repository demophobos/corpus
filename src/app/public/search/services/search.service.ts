import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '@core/services';
import { AppConfig } from '@shared/constants';
import { FormSearchType, LocalStorageKeyEnum } from '@shared/enums';
import { ChunkElementView, ChunkQuery, ChunkView, HeaderModel, IndexView, MorphModel, PageResponse } from '@shared/models';
import { InterpModel } from '@shared/models/project/interpModel';
import { LocalStorageService } from '@shared/services';
import { promise } from 'protractor';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {

  public currentQuery: ReplaySubject<ChunkQuery> = new ReplaySubject<ChunkQuery>(1);
  public elementedChunks: ReplaySubject<ChunkElementView[]> = new ReplaySubject<ChunkElementView[]>(1);
  public foundForms: ReplaySubject<MorphModel[]> = new ReplaySubject<MorphModel[]>(1);
  public isLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public showComment: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public comment: ReplaySubject<ChunkElementView> = new ReplaySubject<ChunkElementView>(1);
  constructor(
    private localStorageService: LocalStorageService,
    private indexService: ApiService<IndexView>,
    private morphService: ApiService<MorphModel>,
    private interpService: ApiService<InterpModel>,
    private chunkService: ApiService<ChunkView>,
    private headerService: ApiService<HeaderModel>
  ) {
    this.getLocalStorageQuery();
  }
  ngOnInit(): void {

  }

  loadComment(chunk: ChunkElementView) {
    this.comment.next(chunk);
  }

  showCommentPane(show: boolean) {
    this.showComment.next(show);
  }

  public getLocalStorageQuery() : ChunkQuery {
    let query = this.localStorageService.getItem(LocalStorageKeyEnum.Query);
    this.currentQuery.next(query);
    return query;
  }

  removeLocalStorageQuery() {
    this.localStorageService.removeItem(LocalStorageKeyEnum.Query);
    this.currentQuery.next(new ChunkQuery({}));
  }

  resetQuery(query: ChunkQuery) {
    query.skip = 0;
    query.index = 0;
    query.total = 0;
    query.limit = AppConfig.DefaultPageLimit;
    query.forms = [];
}

  public async getChunks(query: ChunkQuery){

    this.comment.next(null);

    this.isLoading.next(true);

    let value = query.value;

    if(query.formSearchType == FormSearchType.Lemma){

      if(query.skip == 0 && query.total == 0){

        const forms = await this.morphService.findByQuery(new MorphModel({}), JSON.stringify({value: query.value, formSearchType : query.formSearchType})).toPromise()
        .then((forms: MorphModel[])=>{
          return Promise.resolve(forms);
        })

        const formValues = forms.filter((thing, i, arr) => arr.findIndex(t => t.form == thing.form) === i).map(i=>i.form);
  
        this.foundForms.next(forms);

        query.forms = formValues;

        value = query.forms.join(' ');

      }else{
        value = query.forms.join(' ');
      }
    }

    let page = await this.chunkService.findPageByQuery(new ChunkView({}), 
    JSON.stringify({value : value, skip: query.skip, limit: query.limit, total: query.total, headers : query.headers})).toPromise()
    .then((page: PageResponse)=> {
      return Promise.resolve(page);
    });

    this.setResult(page, query);
  }

  private setResult(page: any, query: ChunkQuery) {

    this.elementedChunks.next(page.documents);

    query.total = page.total;

    this.currentQuery.next(query);

    this.localStorageService.setItem(LocalStorageKeyEnum.Query, query);

    this.isLoading.next(false);
  }

  public async getInterp(id: string, interp: boolean = true, skip: number = 0, limit: number = 0, total: number = 0) : Promise<ChunkView[]>{

    let query = interp ? {sourceId: id} : {interpId: id};

    const interps = await this.interpService.findByQuery(new InterpModel({}), JSON.stringify(query)).toPromise();

    if(interps.length == 0){

      return Promise.resolve([]);

    }else{

      let chunkIds = interp ? interps.map(i => i.interpId) : interps.map(i_1 => i_1.sourceId);

      const page = await this.chunkService.findPageByQuery(new ChunkView({}), JSON.stringify({ chunkIds: chunkIds, skip: skip, limit: limit, total: total })).toPromise()
      .then((page: PageResponse)=>{
        return page;
      });
  
      return await Promise.resolve(page.documents as ChunkElementView[]);
    }
  }

  public async getIndex(id: string): Promise<IndexView> {

    const result = await this.indexService .findByQuery(new IndexView({}), JSON.stringify({ _id: id })).toPromise();

    return await Promise.resolve(result[0]);
  }

  public async getHeaders(): Promise<HeaderModel[]>{
    return await this.headerService.findByQuery(new HeaderModel({}), JSON.stringify({})).toPromise()
    .then((headers: HeaderModel[])=>{
      return Promise.resolve(headers);
    });
  }
}
