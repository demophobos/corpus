import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { EventEnum } from '@shared/enums';
import { IndexNodeConverter } from '@shared/helpers';
import { Index, IndexTreeNode } from '@shared/models';
import { EditorEventService } from 'app/layouts/editor/editor.event.service';

@Component({
  selector: 'app-index-menu',
  templateUrl: './index-menu.component.html',
  styleUrls: ['./index-menu.component.scss'],
})
export class IndexMenuComponent extends BaseComponent implements OnInit {
  @Input() indexTreeNode: IndexTreeNode;

  constructor(private eventService: EditorEventService) {
    super();
  }

  ngOnInit(): void {}

  deleteIndex() {
    this.eventService.do(EventEnum.INDEX_DELETE, this.indexTreeNode);
  }

  editIndex() {
    let index = IndexNodeConverter.convertIndexTreeNodeToIndex(
      this.indexTreeNode
    );
    this.eventService.do(EventEnum.INDEX_UPDATE, {
      parent: undefined,
      index: index,
    });
  }

  addIndex() {
    let childIndex = new Index({
      headerId: this.indexTreeNode.headerId,
      parentId: this.indexTreeNode.id,
    });
    this.eventService.do(EventEnum.INDEX_CREATE, {
      parent: this.indexTreeNode,
      index: childIndex,
    });
  }
}
