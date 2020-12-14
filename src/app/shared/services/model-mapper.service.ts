import { Injectable } from '@angular/core';
import { SELECT_ITEM_HEIGHT_EM } from '@angular/material/select';
import { HeaderComponent } from '@shared/components';
import { AppType } from '@shared/constants';
import { Language } from '@shared/enums';
import { Chunk, Header, Index, Model, Project, User } from '@shared/models';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelMapperService {
  constructor() {}

  public static Map<T extends Model>(obj: T, item: any) {
    switch (obj.type) {
      case AppType.User:
        return this.ToUser(item);
      case AppType.Project:
        return this.ToProject(item);
      case AppType.Header:
        return this.ToHeader(item);
      case AppType.Index:
        return this.ToIndex(item);
      case AppType.Chunk:
        return this.ToChunk(item);
      default:
        return throwError(this.toString() + '. Unknown Type');
    }
  }
  static ToChunk(item: any) {
    return new Chunk({
      id:item._id,
      indexId: item.indexId,
      value: item.value,
      created: item.created,
      creatorId: item.creatorId,
      modified: item.modified,
      modifierId: item.modifierId
    });
  }
  static ToIndex(item: any): Index {
    return new Index({
      id: item._id,
      headerId: item.headerId,
      name: item.name,
      order: item.order,
      parentId: item.parentId,
      created: item.created,
      creatorId: item.creatorId,
      modified: item.modified,
      modifierId: item.modifierId
    });
  }
  static ToHeader(item: any): Header {
    return new Header({
      id: item._id,
      code: item.code,
      name: item.name,
      desc: item.desc,
      projectId: item.projectId,
      created: item.created,
      creatorId: item.creatorId,
      modified: item.modified,
      modifierId: item.modifierId,
      editionType: item.editionType,
      lang: item.lang,
    });
  }

  private static ToProject(item: any): Project {
    return new Project({
      id: item._id,
      name: item.name,
      desc: item.desc,
      created: item.created,
      creatorId: item.creatorId,
      modified: item.modified,
      modifierId: item.modifierId,
    });
  }

  private static ToUser(item: any): User {
    return new User({
      id: item._id,
      email: item.email,
      password: item.password,
    });
  }
}
