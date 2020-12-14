import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { Chunk, IndexTreeNode } from '@shared/models';
import { DialogService } from '@shared/services';
import { DocumentService } from '../../../services/document.service';
import { ChunkEditorComponent } from '../chunk-editor/chunk-editor.component';

@Component({
  selector: 'app-chunk-analyser',
  templateUrl: './chunk-analyser.component.html',
  styleUrls: ['./chunk-analyser.component.scss'],
})
export class ChunkAnalyserComponent extends BaseComponent implements OnInit {
  chunk: Chunk;
  indexTreeNode: IndexTreeNode;
  chunkAreaSize: Number = 20;
  toolAreaSize: Number = 80;
  gutterSize: Number = 11;
  useTransition: Boolean = true;
  constructor(
    private dialogService: DialogService,
    private documentService: DocumentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.documentService.selectedIndex$.subscribe((indexTreeNode) => {
      this.indexTreeNode = indexTreeNode;
      if (indexTreeNode) {
        this.documentService.getChunkByIndex(indexTreeNode.id).then((chunk) => {
          this.chunk = chunk;
          this.documentService.selectChunk(this.chunk);
        });
      } else {
        this.chunk = undefined;
        this.documentService.selectChunk(this.chunk);
      }
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
    let chunk = new Chunk({ indexId: this.indexTreeNode.id });
    this.dialogService
      .showComponent(ChunkEditorComponent, chunk, AppConfig.DefaultDialogWidth)
      .toPromise()
      .then((chunk) => {
        if (chunk) {
          this.chunk = chunk;
        }
      })
      .then(() => Promise.resolve());
  }

  editChunk() {
    this.dialogService
      .showComponent(
        ChunkEditorComponent,
        this.chunk,
        AppConfig.DefaultDialogWidth
      )
      .toPromise()
      .then((chunk) => {
        if (chunk) {
          this.chunk = chunk;
        }
      })
      .then(() => Promise.resolve());
  }

  deleteChunk() {
    if (this.chunk) {
      this.dialogService
        .confirm(this.chunk.value, 'Are you sure?')
        .toPromise()
        .then((confirmed) => {
          if (confirmed) {
            this.documentService.deleteChunk(this.chunk);
          }
        });
    }
  }
}
