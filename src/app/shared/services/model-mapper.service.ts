import { Injectable } from '@angular/core';
import { AppType } from '@shared/constants';
import {
  ChunkModel,
  ElementView,
  HeaderModel,
  IndexModel,
  IndexView,
  Model,
  MorphModel,
  InterpModel,
  PageResponse as PageResponse,
  ChunkView,
  TaxonomyViewModel,
  HeaderView,
  NoteModel,
  NoteLinkModel,
} from '@shared/models';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelMapperService {
  constructor() {}

  public static Map<T extends Model>(obj: T, item: any) {
    switch (obj.apiType) {
      case AppType.Taxonomy:
        return this.ToTaxonomy(item);
      case AppType.Header:
        return this.ToHeaderView(item);
        case AppType.ChunkView:
        return this.ToChunkViewPage(item);
      case AppType.Morph:
        return this.ToMorph(item);
      case AppType.Interp:
        return this.ToInterp(item);
      case AppType.ElementView:
         return this.ToElementView(item);
      case AppType.Index:
        return this.ToIndex(item);
      case AppType.Note:
        return this.ToNote(item);
      case AppType.NoteLink:
        return this.ToNoteLink(item);
      default:
        return throwError(this.toString() + '. Unknown Type');
    }
  }
  static ToNoteLink(item: any) {
    return new NoteLinkModel(
      {
        id: item._id,
        headerId: item.headerId,
        indexId: item.indexId,
        itemId:item.itemId,
        noteId: item.noteId,
        target: item.target
      });
  }
  static ToNote(item: any) {
    return new NoteModel(
      {
        id: item._id,
        headerId: item.headerId,
        type: item.type,
        value: item.value
      });
  }
  static ToTaxonomy(item: any) {
    return new TaxonomyViewModel(
      {
        id: item._id,
        code: item.code,
        categoryCode: item.categoryCode,
        categoryDesc: item.categoryDesc,
        categoryId:item.categoryId,
        desc: item.desc,
        parentId: item.parentId
      });
  }
  static ToChunkViewPage(item: any) {
    let pageResponse = new PageResponse({
      total: item.total,
      skipped: item.skipped,
      limited: item.limited
    });

    pageResponse.documents = item.documents.map((res: ChunkView) => {
      return this.ToChunkView(res);
    });
    return pageResponse;
  }

  static ToChunkView(item: any) {
    let chunkView = new ChunkView({
      id: item._id,
      indexId: item.indexId,
      value: item.value,
      indexName : item.indexName,
      headerDesc : item.headerDesc,
      indexOrder : item.indexOrder,
      headerId : item.headerId,
      projectDesc : item.projectDesc,
      projectCode : item.projectCode,
      headerCode : item.headerCode,
      headerLang : item.headerLang,
      headerEditionType : item.headerEditionType,
      projectId : item.projectId,
      valueObj: item.valueObj
    });

    chunkView.elements = JSON.parse(chunkView.valueObj);

    return chunkView;
  }

  
  static ToInterp(item: any) {
    return new InterpModel({
      id: item._id,
      sourceHeaderId : item.sourceHeaderId,
      interpHeaderId: item.interpHeaderId,
      interpId: item.interpId,
      sourceId: item.sourceId
    });
  }
  static ToMorph(item: any): MorphModel {
    return new MorphModel({
      id: item._id,
      lemma: item.lemma,
      form: item.form,
      pos: item.pos,
      gender: item.gender,
      case: item.case,
      dialect: item.dialect,
      feature: item.feature,
      person: item.person,
      number: item.number,
      tense: item.tense,
      mood: item.mood,
      voice: item.voice,
      degree: item.degree,
      lang: item.lang
    });
  }
  
  static ToIndexView(item: any): IndexView {
    return new IndexView({
      id: item._id,
      headerId: item.headerId,
      name: item.name,
      order: item.order,
      parentId: item.parentId,
      projectId: item.projectId,
      projectCode: item.projectCode,
      projectDesc: item.projectDesc,
      projectCreator: item.projectCreator,
      headerCode: item.headerCode,
      headerEditionType: item.headerEditionType,
      headerDesc: item.headerDesc,
      headerLang: item.headerLang,
      projectCreated: item.projectCreated,
    });
  }
  static ToElementView(item: any): ElementView {
    return new ElementView({
      id: item._id,
      value: item.value,
      chunkId: item.chunkId,
      order: item.order,
      type: item.type,
      morphId: item.morphId,
      headerId: item.headerId,
      lemma: item.lemma,
      form: item.form,
      pos: item.pos,
      gender: item.gender,
      case: item.case,
      dialect: item.dialect,
      feature: item.feature,
      person: item.person,
      number: item.number,
      tense: item.tense,
      mood: item.mood,
      voice: item.voice,
      degree: item.degree,
      lang: item.lang,
      projectCode: item.projectCode,
      projectId: item.projectId,
      indexName: item.indexName,
      indexId: item.indexId,
      headerCode: item.headerCode,
    });
  }
  static ToChunk(item: any) {
    return new ChunkModel({
      id: item._id,
      indexId: item.indexId,
      value: item.value,
    });
  }

  static ToIndex(item: any): IndexModel {
    return new IndexModel({
      id: item._id,
      headerId: item.headerId,
      name: item.name,
      order: item.order,
      parentId: item.parentId,
    });
  }

  static ToHeader(item: any): HeaderModel {
    return new HeaderModel({
      id: item._id,
      code: item.code,
      name: item.name,
      desc: item.desc,
      projectId: item.projectId,
      editionType: item.editionType,
      lang: item.lang,
    });
  }
  static ToHeaderView(item: any): HeaderView {
    return new HeaderView({
      id: item._id,
      code: item.code,
      name: item.name,
      desc: item.desc,
      projectId: item.projectId,
      editionType: item.editionType,
      lang: item.lang,
      projectCode : item.projectCode,
      projectDesc: item.projectDesc
    });
  }
}
