import { EventEmitter, Injectable } from '@angular/core';
import { EventEnum } from '@shared/enums';
import { Chunk, Index } from '@shared/models';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  INDEX_CREATED = new EventEmitter<Index>();
  INDEX_UPDATED = new EventEmitter<Index>();
  INDEX_DELETED = new EventEmitter<Index>();
  INDEX_SELECTED = new EventEmitter<Index>();

  CHUNK_CREATED = new EventEmitter<Chunk>();
  CHUNK_UPDATED = new EventEmitter<Chunk>();
  CHUNK_DELETED = new EventEmitter<Chunk>();
  CHUNK_SELECTED = new EventEmitter<Chunk>();

  constructor(private documentService: DocumentService) {}

  public do(event: EventEnum, item: any) {
    switch (event) {
      case EventEnum.CHUNK_CREATE:
        this.documentService.showChunkEditorDialog(item).then((chunk: Chunk) => {
          this.documentService.createChunk(chunk).then((chunk: Chunk) => {
            this.CHUNK_CREATED.emit(chunk);
          });
        });
        break;
      case EventEnum.CHUNK_UPDATE:
        this.documentService.showChunkEditorDialog(item).then((chunk: Chunk) => {
          this.documentService.updateChunk(chunk).then((chunk: Chunk) => {
            this.CHUNK_UPDATED.emit(chunk);
          });
        });
        break;
      case EventEnum.CHUNK_DELETE:
        this.documentService.deleteChunk(item).then((chunk: Chunk) => {
          if (chunk) {
            this.CHUNK_DELETED.emit(chunk);
          }
        });
        break;
      case EventEnum.CHUNK_SELECT:
        this.CHUNK_SELECTED.emit(item);
        break;
      case EventEnum.INDEX_SELECT:
        let index: Index = this.documentService.convertIndexTreeNodeToIndex(item);
        this.INDEX_SELECTED.emit(index);
        this.documentService.getChunkByIndex(index.id).then((chunk) => {
          this.CHUNK_SELECTED.emit(chunk);
        });
        break;
    }
  }
}
