import { ElementSchemaRegistry } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AppType } from '@shared/constants';
import {
  Chunk,
  ChunkElementView,
  ElementView,
  Header,
  Index,
  IndexView,
  Model,
  Project,
  User,
} from '@shared/models';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelMapperService {
  constructor() {}

  public static Map<T extends Model>(obj: T, item: any) {
    switch (obj.apiType) {
      case AppType.Header:
        return this.ToHeader(item);
      case AppType.Chunk:
        return this.ToChunk(item);
      case AppType.ChunkElementView:
        return this.ToChunkElementView(item);
      // case AppType.ElementView:
      //   return this.ToElementView(item);
      case AppType.IndexView:
        return this.ToIndexView(item);
      default:
        return throwError(this.toString() + '. Unknown Type');
    }
  }
  static ToChunkElementView(item: any) {
    let chunk = new ChunkElementView({
      id: item._id,
      indexId: item.indexId,
      value: item.value,
      indexName: item.indexName,
      headerDesc: item.headerDesc,
      indexOrder: item.indexOrder,
      headerId: item.headerId,
      projectDesc: item.projectDesc,
      projectCode: item.projectCode,
      headerCode: item.headerCode,
      headerLang: item.headerLang,
      headerEditionType: item.headerEditionType,
      projectId: item.projectId,
      elements: item.elements.map((res: ElementView) => {
        return this.ToElementView(res);
      })
    });
    return chunk;
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
    return new Chunk({
      id: item._id,
      indexId: item.indexId,
      value: item.value,
    });
  }

  static ToIndex(item: any): Index {
    return new Index({
      id: item._id,
      headerId: item.headerId,
      name: item.name,
      order: item.order,
      parentId: item.parentId,
    });
  }

  static ToHeader(item: any): Header {
    return new Header({
      id: item._id,
      code: item.code,
      name: item.name,
      desc: item.desc,
      projectId: item.projectId,
      editionType: item.editionType,
      lang: item.lang,
    });
  }
}
