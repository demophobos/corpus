import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { Chunk, Index, IndexTreeNode } from '@shared/models';
import { DialogService } from '@shared/services';
import { DocumentService } from '../../../services/document.service';
import { ChunkEditorComponent } from '../../../../chunk/components/chunk-editor/chunk-editor.component';
import { IndexEditorComponent } from '../index-editor/index-editor.component';

@Component({
  selector: 'app-index-menu',
  templateUrl: './index-menu.component.html',
  styleUrls: ['./index-menu.component.scss']
})
export class IndexMenuComponent extends BaseComponent implements OnInit {
  
  @Input() indexTreeNode: IndexTreeNode;

  constructor(private dialogService: DialogService, private documentService: DocumentService) {
    super();
  }

  ngOnInit(): void {

  }

  deleteIndex() {
    this.dialogService.confirm(this.indexTreeNode.name, 'Are you sure?')
    .toPromise().then(confirmed => {
      if (confirmed) {
        this.documentService.deleteIndexNode(this.indexTreeNode);
      }
    });
  }

  editIndex() {
    let index = this.documentService.convertIndexTreeNodeToIndex(this.indexTreeNode);
    this.dialogService.showComponent(IndexEditorComponent, { parent: undefined, index: index}, AppConfig.DefaultDialogWidth);
  }


  addIndex() {
    let childIndex = new Index({headerId:this.indexTreeNode.headerId, parentId : this.indexTreeNode.id });
    this.dialogService.showComponent(IndexEditorComponent, { parent: this.indexTreeNode, index: childIndex}, AppConfig.DefaultDialogWidth);
  }
}
