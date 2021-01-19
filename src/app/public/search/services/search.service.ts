import { Injectable, Injector, OnInit } from '@angular/core';
import { ApiService } from '@core/services';
import { FormSearchType, LocalStorageKeyEnum } from '@shared/enums';
import { ChunkElementView, ElementQuery, ElementView, IndexView, MorphModel } from '@shared/models';
import { InterpModel } from '@shared/models/project/interpModel';
import { LocalStorageService } from '@shared/services';
import { ReplaySubject } from 'rxjs';
import { last } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {

  public currentQuery: ReplaySubject<ElementQuery> = new ReplaySubject<ElementQuery>(1);
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

  public getLocalStorageQuery() : ElementQuery {
    let query = this.localStorageService.getItem(LocalStorageKeyEnum.Query);
    this.currentQuery.next(query);
    return query;
  }

  removeLocalStorageQuery() {
    this.localStorageService.removeItem(LocalStorageKeyEnum.Query);
    this.currentQuery.next(new ElementQuery({}));
  }

  public getChunks(query: ElementQuery) {

    this.localStorageService.setItem(LocalStorageKeyEnum.Query, query);

    this.chunks.next(new Array<ChunkElementView>());

    this.currentQuery.next(query);

    this.isLoading.next(true);

    if(query.formSearchType == FormSearchType.Free){
      this.elementService.findByQuery(new ElementView({}), JSON.stringify({value : query.value, caseSensitive : query.caseSensitive})).toPromise()
      .then((value : ChunkElementView[]) => {
        this.chunks.next(value);
        this.isLoading.next(false);
      });
    } else{
      this.morphService.findByQuery(new MorphModel({}), JSON.stringify({value: query.value, formSearchType : query.formSearchType})).toPromise()
      .then((forms: MorphModel[])=>{
        return forms;
      })
      .then(forms => {
        //check query options for forms
        var morphIds = forms.map(i=>i.id);
        this.morphIds.next(morphIds);
        this.elementService.findByQuery(new ElementView({}), JSON.stringify({morphIds: morphIds})).toPromise()
        .then((value : ChunkElementView[]) => {
          this.chunks.next(value);
          this.isLoading.next(false);
        });
      });
    }
  }

  public getInterp(id: string, interp: boolean = true) : Promise<ChunkElementView[]>{
    let query = interp ? {sourceId: id} : {interpId: id};
    return this.interpService.findByQuery(new InterpModel({}), JSON.stringify(query)).toPromise()
    .then((value: InterpModel[])=>{
      let chunkIds = interp ? value.map(i=>i.interpId) : value.map(i=>i.sourceId);
      return this.elementService.findByQuery(new ElementView({}), JSON.stringify({chunkIds: chunkIds})).toPromise()
        .then((value: ChunkElementView[]) => {
          return Promise.resolve(value);
        });
    });
  }

  public getIndex(id: string): Promise<IndexView> {
    return this.indexService
      .findByQuery(new IndexView({}), JSON.stringify({ _id: id }))
      .toPromise()
      .then((result: IndexView[]) => {
        return Promise.resolve(result[0]);
      });
  }
}
