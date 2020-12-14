import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BaseComponent } from '@shared/components';
import { Index, IndexTreeNode } from '@shared/models';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-index-tree',
  templateUrl: './index-tree.component.html',
  styleUrls: ['./index-tree.component.scss'],
})
export class IndexTreeComponent extends BaseComponent implements OnInit {
  treeControl = new NestedTreeControl<IndexTreeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<IndexTreeNode>();

  constructor(private readonly documentService: DocumentService) {
    super();
  }
  ngOnInit() {
    this.documentService.content$.subscribe((items) => {
      this.dataSource.data = items;
    });
  }
  hasChild = (_: number, node: IndexTreeNode) =>
    !!node.children && node.children.length > 0;

  selectIndex(index: IndexTreeNode) {
    this.documentService.selectIndex(index);
  }
}
