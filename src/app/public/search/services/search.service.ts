import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '@core/services';
import { SpinnerComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { LocalStorageKeyEnum } from '@shared/enums';
import { Guid } from '@shared/helpers';
import {
  ChunkQuery,
  ChunkValueItemModel,
  ChunkView,
  ElementView,
  HeaderModel,
  HeaderView,
  IndexView,
  MorphModel,
  PageResponse,
  TaxonomyQuery,
  TaxonomyViewModel,
} from '@shared/models';
import { InterpModel } from '@shared/models/project/interpModel';
import { DialogService, LocalStorageService } from '@shared/services';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {


  //#region Commentable entities
  public commentable: BehaviorSubject<ChunkView | ChunkValueItemModel | ElementView> = new BehaviorSubject<ChunkView |ChunkValueItemModel | ElementView>(undefined);

  set setCommentable(value: ChunkView | ChunkValueItemModel | ElementView){
    this.commentable.next(value);
  }
  //#endregion
  public rawValue = new BehaviorSubject<string>(undefined);

  getRawValue(){
    return this.rawValue.value;
  }
  
  public searchLemma = new BehaviorSubject<boolean>(false);
  public selectedAttributes = new BehaviorSubject<string[]>([]);
  public selectedWorks = new BehaviorSubject<HeaderModel[]>([]);
  public headers = new BehaviorSubject<HeaderView[]>([]);

  public getHeaders(){
    return this.headers.value;
  }

  public chunkQuery: ReplaySubject<ChunkQuery> = new ReplaySubject<ChunkQuery>(1);
  public elementedChunks: ReplaySubject<ChunkView[]> = new ReplaySubject<ChunkView[]>(1);
  public foundForms: ReplaySubject<MorphModel[]> = new ReplaySubject<MorphModel[]>(1);
  public isLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(
    private localStorageService: LocalStorageService,
    private indexService: ApiService<IndexView>,
    private morphService: ApiService<MorphModel>,
    private interpService: ApiService<InterpModel>,
    private chunkService: ApiService<ChunkView>,
    private headerService: ApiService<HeaderModel>,
    private taxonomyService: ApiService<TaxonomyViewModel>,
    private elementService: ApiService<ElementView>,
    private dialogService: DialogService
  ) {
    this.initQuery();
    this.loadHeaders();
  }
  ngOnInit(): void {
    
  }

  setSelectedWorksCount(query: ChunkQuery){
    let arr: HeaderModel[] = [];

     this.getHeaders().forEach(i=>{
       if(query.headers.includes(i.id)){
         arr.push(i);
       }
    });

    this.selectedWorks.next(arr);
  }

  setSelectedMorphAttrubutes(query: ChunkQuery)  {
    this.selectedAttributes.next(Array().concat(
      query.pos, 
      query.gender, 
      query.case, 
      query.person, 
      query.number, 
      query.tense, 
      query.mood, 
      query.voice, 
      query.degree));
  }

  public showSpinner() {
    return this.dialogService.showLoader(SpinnerComponent);
  }

  public getLocalStorageQuery() {
    let query = this.localStorageService.getItem(LocalStorageKeyEnum.Query);
    if (query) {
      this.chunkQuery.next(query);
    } else {
      query = new ChunkQuery({})
      this.chunkQuery.next(query);
    }
    this.setSelectedMorphAttrubutes(query);
  }

  public initQuery() {
    this.localStorageService.removeItem(LocalStorageKeyEnum.Query);
    let query = new ChunkQuery({})
    this.chunkQuery.next(query);
    this.setSelectedMorphAttrubutes(query);
  }

  resetQuery(query: ChunkQuery) {
    query.quid = Guid.newGuid();
    query.skip = 0;
    query.index = 0;
    query.total = 0;
    query.limit = AppConfig.DefaultPageLimit;
    query.forms = [];
    this.foundForms.next([]);
  }

  public async getChunk(){
    
  }

  public async getChunks(query: ChunkQuery) {

    this.isLoading.next(true);

    let value = query.value;

    if (query.skip == 0 && query.total == 0) {
      let forms = await this.morphService.findByQuery(new MorphModel({}), JSON.stringify({value: query.value, searchLemma: query.searchLemma }))
      .toPromise()
      .then((forms: MorphModel[]) => {
        return Promise.resolve(forms);
      });

    if(forms.length > 0){
      forms = this.filterByAttributes(query, forms);

      let formValues = forms.filter((thing, i, arr) => arr.findIndex((t) => t.form == thing.form) === i).map((i) => i.form);
  
      this.foundForms.next(forms);
  
      query.forms = formValues;
    }else{
      query.forms = value.split(' ');
    }
    if(query.valueOp == 'phrase'){
      value = query.value;
    }else{
      value = query.forms.join(' ');
    }

    } else {
      if(query.valueOp == 'phrase'){
        value = query.value;
      }else{
        value = query.forms.join(' ');
      }
  
    }

    let page = await this.chunkService.findPageByQuery(new ChunkView({}), 
    JSON.stringify({
      quid:query.quid,
      valueOp: query.valueOp, 
      valueIp:query.valueIp, 
      value: value, 
      skip: query.skip, 
      limit: query.limit, 
      total: query.total, 
      headers: query.headers,
        })
      )
      .toPromise()
      .then((page: PageResponse) => {
        return Promise.resolve(page);
      });

    this.setResult(page, query);
  }

  filterByAttributes(query: ChunkQuery, forms: MorphModel[]): MorphModel[] {
    let selected = forms;
    if (query) {
      selected = forms.filter(
        (i) =>
          this.contains(query.pos, i.pos) &&
          this.contains(query.mood, i.mood) &&
          this.contains(query.number, i.number) &&
          this.contains(query.tense, i.tense) &&
          this.contains(query.voice, i.voice) &&
          this.contains(query.case, i.case) &&
          this.contains(query.degree, i.degree) &&
          this.contains(query.gender, i.gender)
      );
    }
    return selected;
  }

  private contains(formAttrs: string[], attr: string): boolean {
    if(formAttrs.length == 0){
      return true;
    }
    return formAttrs.indexOf(attr) > -1;
  }

  private setResult(page: any, query: ChunkQuery) {
    this.elementedChunks.next(page.documents);

    query.total = page.total;

    this.chunkQuery.next(query);

    this.localStorageService.setItem(LocalStorageKeyEnum.Query, query);

    this.isLoading.next(false);
  }

  public async getInterp(
    id: string,
    interp: boolean = true,
    skip: number = 0,
    limit: number = 0,
    total: number = 0
  ): Promise<ChunkView[]> {
    let query = interp ? { sourceId: id } : { interpId: id };

    const interps = await this.interpService
      .findByQuery(new InterpModel({}), JSON.stringify(query))
      .toPromise();

    if (interps.length == 0) {
      return Promise.resolve([]);
    } else {
      let chunkIds = interp
        ? interps.map((i) => i.interpId)
        : interps.map((i_1) => i_1.sourceId);

      const page = await this.chunkService
        .findPageByQuery(
          new ChunkView({}),
          JSON.stringify({
            chunkIds: chunkIds,
            skip: skip,
            limit: limit,
            total: total,
          })
        )
        .toPromise()
        .then((page: PageResponse) => {
          return page;
        });

      return await Promise.resolve(page.documents as ChunkView[]);
    }
  }

  public async getIndex(id: string): Promise<IndexView> {
    const result = await this.indexService
      .findByQuery(new IndexView({}), JSON.stringify({ _id: id }))
      .toPromise();

    return await Promise.resolve(result[0]);
  }

  private async loadHeaders() {
    return await this.headerService
      .findByQuery(new HeaderView({}), JSON.stringify({}))
      .toPromise()
      .then((headers: HeaderView[]) => {
        this.headers.next(headers);
        return Promise.resolve();
      });
  }

  public getTaxonomyItems(categoryCode: string): Promise<TaxonomyViewModel[]> {
    return this.taxonomyService
      .findByQuery(
        new TaxonomyViewModel({}),
        JSON.stringify(new TaxonomyQuery({ categoryCode: categoryCode }))
      )
      .toPromise()
      .then((items: TaxonomyViewModel[]) => {
        return Promise.resolve(items);
      });
  }

  public getAllTaxonomyItems(): Promise<TaxonomyViewModel[]> {
    return this.taxonomyService
      .findByQuery(
        new TaxonomyViewModel({}),
        JSON.stringify(new TaxonomyQuery({}))
      )
      .toPromise()
      .then((items: TaxonomyViewModel[]) => {
        return Promise.resolve(items);
      });
  }

  async countWordUsage(value: string):Promise<Number>{
    return this.elementService.countByQuery(new ElementView({}), JSON.stringify({getCount: true, value: value})).toPromise()
    .then((result: Number)=>{
      return Promise.resolve(result);
    });

  }
}
