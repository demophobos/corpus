import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { IndexTreeItem, IndexService } from '../../services/index.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@shared/components';

@Component({
  selector: 'app-index-tree',
  templateUrl: './index-tree.component.html',
  styleUrls: ['./index-tree.component.scss'],
})
export class IndexTreeComponent extends BaseComponent implements OnInit {
  interpIsLoading: boolean = true;
  treeControl = new NestedTreeControl<IndexTreeItem>((node) => node.indexItems);
  dataSource = new MatTreeNestedDataSource<IndexTreeItem>();
  constructor(private indexService: IndexService) {
    super();
    this.indexService.selectedHeader
      .pipe(takeUntil(this.destroyed))
      .subscribe((header) => {
        if (header) {
          this.interpIsLoading = true;
          this.indexService
            .getIndexTree(header.id)
            .then((indeces) => {
              this.dataSource.data = indeces;
            })
            .then(() => {
              this.interpIsLoading = false;
            });
        }
      });
  }

  hasChild = (_: number, node: IndexTreeItem) =>
    !!node.indexItems && node.indexItems.length > 0;

  ngOnInit(): void {}

  indexChanged(indexId: string) {
    if (indexId) {
      this.indexService.selectedIndex.next(indexId);
    }
  }
}
