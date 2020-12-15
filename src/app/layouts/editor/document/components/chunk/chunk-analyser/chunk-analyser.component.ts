import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { EventEnum } from '@shared/enums';
import { Chunk, Index } from '@shared/models';
import { EventService } from '../../../services/document-event.service';

@Component({
  selector: 'app-chunk-analyser',
  templateUrl: './chunk-analyser.component.html',
  styleUrls: ['./chunk-analyser.component.scss'],
})
export class ChunkAnalyserComponent extends BaseComponent implements OnInit {
  chunk: Chunk;
  index: Index;
  chunkAreaSize: Number = 20;
  toolAreaSize: Number = 80;
  gutterSize: Number = 11;
  useTransition: Boolean = true;
  constructor(private eventService: EventService) {
    super();
  }

  ngOnInit(): void {
    this.eventService.INDEX_SELECTED.subscribe((index: Index) => {
      this.index = index;
    });
    this.eventService.CHUNK_SELECTED.subscribe((chunk: Chunk) => {
      this.chunk = chunk;
    });
    this.eventService.CHUNK_CREATED.subscribe((chunk: Chunk) => {
      this.chunk = chunk;
    });
    this.eventService.CHUNK_DELETED.subscribe(() => {
      this.chunk = undefined;
    });
  }

  areaDividerClick() {
    if (this.chunkAreaSize > 0) {
      this.chunkAreaSize = 0;
      this.toolAreaSize = 100;
    } else {
      this.chunkAreaSize = 20;
      this.toolAreaSize = 80;
    }
  }

  addChunk() {
    this.eventService.do(EventEnum.CHUNK_CREATE, new Chunk({ indexId: this.index.id }));
  }

  editChunk() {
    this.eventService.do(EventEnum.CHUNK_UPDATE, this.chunk);
  }

  deleteChunk() {
    if (this.chunk) {
      this.eventService.do(EventEnum.CHUNK_DELETE, this.chunk);
    }
  }
}
