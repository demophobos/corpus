import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { Chunk } from '@shared/models';
import { EditorEventService } from '../../../../editor.event.service';

@Component({
  selector: 'app-chunk-viewer',
  templateUrl: './chunk-viewer.component.html',
  styleUrls: ['./chunk-viewer.component.scss'],
})
export class ChunkViewerComponent extends BaseComponent implements OnInit {
  chunk: Chunk;
  constructor(private eventService: EditorEventService) {
    super();
  }

  ngOnInit(): void {
    this.eventService.CHUNK_SELECTED.subscribe((chunk: Chunk) => {
      this.chunk = chunk;
    });
    this.eventService.CHUNK_CREATED.subscribe((chunk: Chunk) => {
      this.chunk = chunk;
    });
    this.eventService.CHUNK_DELETED.subscribe(() => {
      this.chunk = undefined;
    });
    this.eventService.CHUNK_UPDATED.subscribe((chunk: Chunk) => {
      this.chunk = chunk;
    });
  }
}
