import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { Chunk, IndexTreeNode } from '@shared/models';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-chunk-viewer',
  templateUrl: './chunk-viewer.component.html',
  styleUrls: ['./chunk-viewer.component.scss'],
})
export class ChunkViewerComponent extends BaseComponent implements OnInit {
  chunk: Chunk;
  constructor(private documentService: DocumentService) {
    super();
  }

  ngOnInit(): void {
    this.documentService.selectedChunk$.subscribe(chunk=>{
      this.chunk = chunk;
    });
  }
}
