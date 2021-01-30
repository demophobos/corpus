import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '@core/services';
import { AppConfig } from '@shared/constants';
import { LocalStorageKeyEnum } from '@shared/enums';
import {
  ChunkElementView,
  ChunkQuery,
  ChunkView,
  ElementView,
  HeaderModel,
  IndexView,
  MorphModel,
  PageResponse,
  TaxonomyQuery,
  TaxonomyViewModel,
} from '@shared/models';
import { InterpModel } from '@shared/models/project/interpModel';
import { LocalStorageService } from '@shared/services';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {

  //#region CommentPane
  public showComment: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(AppConfig.DefaultShowCommentPane);

  private get getCommentPaneState() : boolean {
    return this.showComment.value; 
  }

  set switchCommentPane(value: boolean) {
    this.showComment.next(value !== this.getCommentPaneState);
  }
  //#endregion

  //#region Commentable entities
  public commentable: BehaviorSubject<ChunkElementView | ElementView> = new BehaviorSubject<ChunkElementView | ElementView>(undefined);

  set setCommentable(value: ChunkElementView | ElementView){
    this.commentable.next(value);
  }
  //#endregion

  public selectedAttributesCount = new BehaviorSubject<number>(0);
  public chunkQuery: ReplaySubject<ChunkQuery> = new ReplaySubject<ChunkQuery>(1);
  public elementedChunks: ReplaySubject<ChunkElementView[]> = new ReplaySubject<ChunkElementView[]>(1);
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
    private elementService: ApiService<ElementView>
  ) {
    this.getLocalStorageQuery();
  }
  ngOnInit(): void {}

  setSelectedMorphAttrubutesCount(query: ChunkQuery)  {
    this.selectedAttributesCount.next(query.pos.length + 
    query.gender.length  +
    query.case.length  +
    query.person.length  +
    query.number.length +
    query.tense.length +
    query.mood.length +
    query.voice.length  + 
    query.degree.length);
  }


  loadComment(chunk: ChunkElementView) {
    this.commentable.next(chunk);
  }

  showCommentPane(show: boolean) {
    this.showComment.next(show);
  }

  public getLocalStorageQuery() {
    let query = this.localStorageService.getItem(LocalStorageKeyEnum.Query);
    if (query) {
      this.chunkQuery.next(query);
    } else {
      query = new ChunkQuery({})
      this.chunkQuery.next(query);
    }
    this.setSelectedMorphAttrubutesCount(query);
  }

  removeLocalStorageQuery() {
    this.localStorageService.removeItem(LocalStorageKeyEnum.Query);
    let query = new ChunkQuery({})
    this.chunkQuery.next(query);
    this.setSelectedMorphAttrubutesCount(query);
  }

  resetQuery(query: ChunkQuery) {
    query.skip = 0;
    query.index = 0;
    query.total = 0;
    query.limit = AppConfig.DefaultPageLimit;
    query.forms = [];
    this.foundForms.next([]);
  }

  public async getChunks(query: ChunkQuery) {
    this.commentable.next(null);

    this.isLoading.next(true);

    let value = query.value;

    if (query.searchLemma) {
      if (query.skip == 0 && query.total == 0) {
        let forms = await this.morphService
          .findByQuery(
            new MorphModel({}),
            JSON.stringify({
              value: query.value,
              formSearchType: query.searchLemma,
            })
          )
          .toPromise()
          .then((forms: MorphModel[]) => {
            return Promise.resolve(forms);
          });

        forms = this.filterByAttributes(query, forms);

        let formValues = forms
          .filter(
            (thing, i, arr) => arr.findIndex((t) => t.form == thing.form) === i
          )
          .map((i) => i.form);

        this.foundForms.next(forms);

        query.forms = formValues;

        value = query.forms.join(' ');
      } else {
        value = query.forms.join(' ');
      }
    }

    let page = await this.chunkService
      .findPageByQuery(
        new ChunkView({}),
        JSON.stringify({
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

      return await Promise.resolve(page.documents as ChunkElementView[]);
    }
  }

  public async getIndex(id: string): Promise<IndexView> {
    const result = await this.indexService
      .findByQuery(new IndexView({}), JSON.stringify({ _id: id }))
      .toPromise();

    return await Promise.resolve(result[0]);
  }

  public async getHeaders(): Promise<HeaderModel[]> {
    return await this.headerService
      .findByQuery(new HeaderModel({}), JSON.stringify({}))
      .toPromise()
      .then((headers: HeaderModel[]) => {
        return Promise.resolve(headers);
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
