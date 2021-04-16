import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '@core/services';
import { SpinnerComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { LocalStorageKeyEnum, PosEnum } from '@shared/enums';
import { Guid } from '@shared/helpers';
import {
  AdjView,
  AdvView,
  ArticleView,
  ChunkQuery,
  ChunkValueItemModel,
  ChunkView,
  ConjView,
  ElementView,
  ExclamView,
  HeaderModel,
  HeaderView,
  IndexView,
  MorphModel,
  NounView,
  NumView,
  PageResponse,
  ParticView,
  PartView,
  PrepView,
  PronView,
  QueryMorph,
  TaxonomyQuery,
  TaxonomyViewModel,
  VerbView,
} from '@shared/models';
import { InterpModel } from '@shared/models/project/interpModel';
import { DialogService, LocalStorageService } from '@shared/services';
import { CommonDataService } from '@shared/services/common-data.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {
  //#region Commentable entities
  public commentable: BehaviorSubject<
    ChunkView | ChunkValueItemModel | ElementView
  > = new BehaviorSubject<ChunkView | ChunkValueItemModel | ElementView>(
    undefined
  );

  set setCommentable(value: ChunkView | ChunkValueItemModel | ElementView) {
    this.commentable.next(value);
  }
  //#endregion
  public rawValue = new BehaviorSubject<string>(undefined);

  getRawValue() {
    return this.rawValue.value;
  }

  public wordCombValue = new BehaviorSubject<string>('or');
  public distanceValue = new BehaviorSubject<string>('0');

  public searchLemma = new BehaviorSubject<boolean>(false);
  public selectedAttributes = new BehaviorSubject<string[]>([]);
  public selectedWorks = new BehaviorSubject<HeaderModel[]>([]);

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
    private elementService: ApiService<ElementView>,
    private commonDataService: CommonDataService
  ) {
    this.initQuery();
  }

  ngOnInit(): void {}

  setSelectedWorksCount(query: ChunkQuery) {
    let arr: HeaderModel[] = [];

    this.commonDataService.headers.value.forEach((i) => {
      if (query.headers.includes(i.id)) {
        arr.push(i);
      }
    });

    this.selectedWorks.next(arr);
  }

  setSelectedMorphAttrubutes(query: ChunkQuery) {
    this.selectedAttributes.next(
      Array().concat(
        query.pos,
        query.gender,
        query.case,
        query.person,
        query.number,
        query.tense,
        query.mood,
        query.voice,
        query.degree
      )
    );
  }

  public getLocalStorageQuery() {
    let query = this.localStorageService.getItem(LocalStorageKeyEnum.Query);
    if (query) {
      this.chunkQuery.next(query);
    } else {
      query = new ChunkQuery({});
      this.chunkQuery.next(query);
    }
    this.setSelectedMorphAttrubutes(query);
  }

  public initQuery() {
    this.localStorageService.removeItem(LocalStorageKeyEnum.Query);
    let query = new ChunkQuery({});
    this.chunkQuery.next(query);
    this.setSelectedMorphAttrubutes(query);
  }

  resetQuery(query: ChunkQuery) {
    query.quid = Guid.newGuid();
    query.skip = 0;
    query.index = 0;
    query.total = 0;
    query.limit = AppConfig.DefaultPageLimit;
    query.includeIds = [];
    query.valueIp = this.distanceValue.value;
    query.valueOp = this.wordCombValue.value;
    this.foundForms.next([]);
  }

  public async getChunks(query: ChunkQuery) {
    this.isLoading.next(true);

    if (query.skip == 0 && query.total == 0) {
      let forms = await this.morphService
        .findByQuery(
          new MorphModel({}),
          JSON.stringify({ value: query.value, allForms: query.searchLemma })
        )
        .toPromise()
        .then((forms: MorphModel[]) => {
          return Promise.resolve(forms);
        });

      if (forms.length > 0) {
        forms = this.filterByAttributes(query, forms);

        this.foundForms.next(forms);

        query.includeIds = forms.map((item: any) => {
          return item.id;
        });
      }
    }

    let page = await this.chunkService
      .findPageByQuery(
        new ChunkView({}),
        JSON.stringify({
          quid: query.quid,
          value: query.value,
          allForms: query.searchLemma,
          valueOp: query.valueOp,
          valueIp: query.valueIp,
          skip: query.skip,
          limit: query.limit,
          total: query.total,
          headers: query.headers,
          includeIds: query.includeIds,
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
    if (formAttrs.length == 0) {
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

  async countWordUsage(value: string): Promise<Number> {
    return this.elementService
      .countByQuery(
        new ElementView({}),
        JSON.stringify({ getCount: true, value: value })
      )
      .toPromise()
      .then((result: Number) => {
        return Promise.resolve(result);
      });
  }

  public getPosView(element: ChunkValueItemModel) {
    switch (element.pos) {
      case PosEnum.Noun:
        return new NounView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          GENUS: element.gender,
          CASUS: element.case,
          NUMERUS: element.number,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Adj:
        return new AdjView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          GENUS: element.gender,
          CASUS: element.case,
          NUMERUS: element.number,
          GRADUS: element.degree,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Adv:
        return new AdvView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          GRADUS: element.degree,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Conj:
        return new ConjView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Exclam:
        return new ExclamView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Numeral:
        return new NumView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          GENUS: element.gender,
          CASUS: element.case,
          NUMERUS: element.number,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Part:
        return new PartView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          GENUS_VERBI: element.voice,
          TEMPUS: element.tense,
          GENUS: element.gender,
          CASUS: element.case,
          NUMERUS: element.number,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Particle:
        return new ParticView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Prep:
        return new PrepView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Pron:
        return new PronView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          GENUS: element.gender,
          CASUS: element.case,
          NUMERUS: element.number,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Verb:
        return new VerbView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          TEMPUS: element.tense,
          MODUS: element.mood,
          GENUS_VERBI: element.voice,
          CASUS: element.case,
          GENUS: element.gender,
          NUMERUS: element.number,
          PERSON: element.person,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      case PosEnum.Article:
        return new ArticleView({
          FORMA: element.form,
          LEMMA: element.lemma,
          PARS_ORATIONIS: element.pos,
          CASUS: element.case,
          GENUS: element.gender,
          NUMERUS: element.number,
          SERMO: element.dialect,
          ATTRIBUTIO: element.feature
        });
      default:
        return null;
    }
  }
}
