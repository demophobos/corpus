import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { IndexTreeItem, IndexService } from '../../services/index.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@shared/components';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-index-tree',
  templateUrl: './index-tree.component.html',
  styleUrls: ['./index-tree.component.scss'],
})
export class IndexTreeComponent extends BaseComponent implements OnInit {
  isLoading: boolean = true;
  treeControl = new NestedTreeControl<IndexTreeItem>((node) => node.indexItems);
  dataSource = new MatTreeNestedDataSource<IndexTreeItem>();
  constructor(private indexService: IndexService, readonly bottomSheet: MatBottomSheet) {
    super();
    this.indexService.selectedHeader
      .pipe(takeUntil(this.destroyed))
      .subscribe((header) => {
        if (header) {
          this.isLoading = true;
          this.indexService
            .getIndexTree(header.id)
            .then((indeces) => {
              this.dataSource.data = indeces;
            })
            .then(() => {
              this.isLoading = false;
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
  closeIndex(){
    this.bottomSheet.dismiss();
  }
}
