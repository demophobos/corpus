import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent } from '@shared/components';
import { ChunkView, HeaderModel, HeaderView } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { IndexService, IndexTreeItem } from '../../services/index.service';
import { IndexTreeComponent } from '../index-tree/index-tree.component';
import { WorkSelectorComponent } from '../work-selector/work-selector.component';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ExplorerComponent extends BaseComponent implements OnInit {
  header: HeaderView;
  chunk: ChunkView;
  length: number = 0;
  pageSize: number = 1;
  indexItems: IndexTreeItem[];
  currentIndex: IndexTreeItem;
  showVersion: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showVersionTooltip: string = 'Ad versionem monstrandam';
  constructor(
    private indexService: IndexService,
    private bottomSheet: MatBottomSheet
  ) {
    super();
  }

  ngOnInit(): void {
    this.indexService.showHideVersion.pipe(takeUntil(this.destroyed)).subscribe((value =>{
        this.showVersion = value;
    }));
    
    this.indexService.selectedHeader
      .pipe(takeUntil(this.destroyed))
      .subscribe((header) => {
        this.header = header;
      });
    this.indexService.selectedIndex
      .pipe(takeUntil(this.destroyed))
      .subscribe((indexId) => {
        if (indexId) {
          this.indexService.getChunk(indexId).then((chunk) => {
            this.chunk = chunk;
            if (this.indexItems && this.indexItems.length > 0) {
              this.currentIndex = this.indexItems.filter(
                (i) => i.id == indexId
              )[0];
              this.paginator.pageIndex = this.indexItems.indexOf(
                this.currentIndex
              );
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
          if (this.paginator) {
            this.paginator.pageIndex = 0;
            this.paginateChange(this.paginator);
          }
        }
      });
  }

  paginateChange(paginator: MatPaginator) {
    this.bottomSheet.dismiss();
    this.currentIndex = this.indexItems[paginator.pageIndex];
    this.indexService.selectedIndex.next(this.currentIndex.id);
  }
  openIndex(event) {
    event.stopPropagation();
    this.bottomSheet.open(IndexTreeComponent, {
      hasBackdrop: false,
      autoFocus: 'first-tabbable',
    });
  }

  showWorkSelector() {
    this.bottomSheet.open(WorkSelectorComponent, {
      hasBackdrop: false,
      autoFocus: 'first-tabbable',
    });
  }
  showHideVersio() {
    this.indexService.showHideVersion.next(!this.indexService.showHideVersion.getValue());
    this.showVersion = this.indexService.showHideVersion.getValue();
    if (this.showVersion) {
      this.showVersionTooltip = 'Ad versionem occultandam';
    } else {
      this.showVersionTooltip = 'Ad versionem monstrandam';
    }
  }
}
