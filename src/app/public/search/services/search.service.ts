import { Injectable, Injector, OnInit } from '@angular/core';
import { ApiService } from '@core/services';
import { FormSearchType, LocalStorageKeyEnum } from '@shared/enums';
import { ChunkElementView, ChunkQuery, ElementView, IndexView, MorphModel, PageResponse } from '@shared/models';
import { InterpModel } from '@shared/models/project/interpModel';
import { LocalStorageService } from '@shared/services';
import { ReplaySubject } from 'rxjs';
import { last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {

  public currentQuery: ReplaySubject<ChunkQuery> = new ReplaySubject<ChunkQuery>(1);
  public chunks: ReplaySubject<ChunkElementView[]> = new ReplaySubject<ChunkElementView[]>(1);
  public morphIds: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  public isLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  constructor(
    private localStorageService: LocalStorageService,
    private elementService: ApiService<ElementView>,
    private indexService: ApiService<IndexView>,
    private morphService: ApiService<MorphModel>,
    private interpService: ApiService<InterpModel>
  ) {
    this.getLocalStorageQuery();
  }
  ngOnInit(): void {

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

  public async getChunks(query: ChunkQuery) {

    this.chunks.next(new Array<ChunkElementView>());

    this.isLoading.next(true);

    if(query.formSearchType == FormSearchType.Free){
      
      let page = await this.elementService.findPageByQuery(new ElementView({}), JSON.stringify({value : query.value, skip: query.skip, limit: query.limit})).toPromise();

      this.setResult(page, query);

    } else{

      let forms = await this.morphService.findByQuery(new MorphModel({}), JSON.stringify({value: query.value, formSearchType : query.formSearchType})).toPromise()
      
      //check query options for forms
      var morphIds = forms.map(i=>i.id);

      this.morphIds.next(morphIds);
      
      let page = await this.elementService.findPageByQuery(new ElementView({}), JSON.stringify({morphIds: morphIds, skip: query.skip, limit: query.limit})).toPromise();
      
      this.setResult(page, query);
    }
  }

  private setResult(page: any, query: ChunkQuery) {

    this.chunks.next(page.documents);

    query.total = page.total;

    query.skip = page.skipped + query.limit;

    this.currentQuery.next(query);

    this.localStorageService.setItem(LocalStorageKeyEnum.Query, query);

    this.isLoading.next(false);
  }

  public async getInterp(id: string, interp: boolean = true, skip: number = 0, limit: number = 0) : Promise<ChunkElementView[]>{

    let query = interp ? {sourceId: id} : {interpId: id};

    const interps = await this.interpService.findByQuery(new InterpModel({}), JSON.stringify(query)).toPromise();

    if(interps.length == 0){

      return Promise.resolve([]);

    }else{

      let chunkIds = interp ? interps.map(i => i.interpId) : interps.map(i_1 => i_1.sourceId);

      const page = await this.elementService.findPageByQuery(new ElementView({}), JSON.stringify({ chunkIds: chunkIds, skip: skip, limit: limit })).toPromise()
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
}
