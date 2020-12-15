import { EventEmitter, Injectable } from '@angular/core';
import { EventEnum } from '@shared/enums';
import { Chunk, Index } from '@shared/models';
import { ChunkService } from './chunk/services/chunk.service';
import { DocumentService } from './document/services/document.service';

@Injectable({
  providedIn: 'root',
})
export class EditorEventService {
  INDEX_CREATED = new EventEmitter<Index>();
  INDEX_UPDATED = new EventEmitter<Index>();
  INDEX_DELETED = new EventEmitter<Index>();
  INDEX_SELECTED = new EventEmitter<Index>();

  CHUNK_CREATED = new EventEmitter<Chunk>();
  CHUNK_UPDATED = new EventEmitter<Chunk>();
  CHUNK_DELETED = new EventEmitter<Chunk>();
  CHUNK_SELECTED = new EventEmitter<Chunk>();

  constructor(private documentService: DocumentService, 
    private chunkService: ChunkService) {}

  public do(event: EventEnum, item: any) {
    switch (event) {
      case EventEnum.CHUNK_CREATE:
        this.chunkService.showChunkEditorDialog(item).then((chunk: Chunk) => {
          this.chunkService.createChunk(chunk).then((chunk: Chunk) => {
            this.CHUNK_CREATED.emit(chunk);
          });
        });
        break;
      case EventEnum.CHUNK_UPDATE:
        this.chunkService.showChunkEditorDialog(item).then((chunk: Chunk) => {
          this.chunkService.updateChunk(chunk).then((chunk: Chunk) => {
            this.CHUNK_UPDATED.emit(chunk);
          });
        });
        break;
      case EventEnum.CHUNK_DELETE:
        this.chunkService.deleteChunk(item).then((chunk: Chunk) => {
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
        this.chunkService.getChunkByIndex(index.id).then((chunk) => {
          this.CHUNK_SELECTED.emit(chunk);
        });
        break;
    }
  }
}