import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { Chunk, IndexTreeNode } from '@shared/models';
import { DialogService } from '@shared/services';
import { DocumentService } from '../../../services/document.service';
import { ChunkEditorComponent } from '../chunk-editor/chunk-editor.component';

@Component({
  selector: 'app-chunk-toolbar',
  templateUrl: './chunk-toolbar.component.html',
  styleUrls: ['./chunk-toolbar.component.scss'],
})
export class ChunkToolbarComponent extends BaseComponent implements OnInit {
  indexTreeNode: IndexTreeNode;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  constructor(
    private documentService: DocumentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.documentService.selectedIndex$.subscribe((indexTreeNode) => {
      this.indexTreeNode = indexTreeNode;
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
