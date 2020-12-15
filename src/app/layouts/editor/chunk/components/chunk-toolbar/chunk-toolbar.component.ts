import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { Chunk, Index, IndexTreeNode } from '@shared/models';
import { DialogService } from '@shared/services';
import { EditorEventService } from '../../../editor.event.service';
import { DocumentService } from '../../../document/services/document.service';
import { ChunkEditorComponent } from '../chunk-editor/chunk-editor.component';

@Component({
  selector: 'app-chunk-toolbar',
  templateUrl: './chunk-toolbar.component.html',
  styleUrls: ['./chunk-toolbar.component.scss'],
})
export class ChunkToolbarComponent extends BaseComponent implements OnInit {
  index: Index;
  chunk: Chunk;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  constructor(
    private eventService: EditorEventService
  ) {
    super();
  }

  ngOnInit(): void {
    this.eventService.INDEX_SELECTED.subscribe((index) => {
      this.index = index;
    });
    this.eventService.CHUNK_CREATED.subscribe((chunk) => {
      this.chunk = chunk;
    });
    this.eventService.CHUNK_SELECTED.subscribe((chunk) => {
      this.chunk = chunk;
    });
    this.eventService.CHUNK_DELETED.subscribe(() => {
      this.chunk = undefined;
    });
  }

  addText() {
    this.add.emit();
  }
  editText() {
    this.edit.emit();
  }

  deleteText(){
    this.delete.emit();
  }
}
