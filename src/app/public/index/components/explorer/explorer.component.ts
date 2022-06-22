import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent } from '@shared/components';
import { ChunkView, HeaderModel, HeaderView } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { IndexService, IndexTreeItem } from '../../services/index.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent
  extends BaseComponent
  implements OnInit
{
  header: HeaderView;
  chunk: ChunkView;
  length: number = 0;
  pageSize: number = 1;
  indexItems: IndexTreeItem[];
  currentIndex: IndexTreeItem;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private indexService: IndexService) {
    super();
  }

  ngOnInit(): void {
    this.indexService.selectedHeader.pipe(takeUntil(this.destroyed)).subscribe(header=>{
      this.header = header;
    });
    this.indexService.selectedIndex
      .pipe(takeUntil(this.destroyed))
      .subscribe((indexId) => {
        if (indexId) {
          this.indexService.getChunk(indexId).then((chunk) => {
            this.chunk = chunk;
            if(this.indexItems && this.indexItems.length > 0){
              this.currentIndex = this.indexItems.filter(i=>i.id == indexId)[0];
              this.paginator.pageIndex = this.indexItems.indexOf(this.currentIndex);
            }
            Promise.resolve();
          });
        } else {
          this.chunk = undefined;
        }
      });

    this.indexService.currentIndexTreeItems
      .pipe(takeUntil(this.destroyed))
      .subscribe((items) => {
        if (items) {
          this.indexService.flatIndexTreeItems = [];
          this.indexService.getFlatIndexTreeItems(items);
          this.indexItems = this.indexService.flatIndexTreeItems;
          this.length = this.indexItems.length;
          if(this.paginator){
            this.paginator.pageIndex = 0;
            this.paginateChange(this.paginator);
          }
        }
      });
  }

  paginateChange(paginator:MatPaginator){
    this.currentIndex = this.indexItems[paginator.pageIndex];
    this.indexService.selectedIndex.next(this.currentIndex.id);
  }
}
