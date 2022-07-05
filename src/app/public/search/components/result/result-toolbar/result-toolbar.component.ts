import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { ChunkQuery } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-result-toolbar',
  templateUrl: './result-toolbar.component.html',
  styleUrls: ['./result-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResultToolbarComponent extends BaseComponent implements OnInit {
  query: ChunkQuery;
  index: number;
  total: number;
  limit: number;
  pageEvent: PageEvent;
  isLoading: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showVersionTooltip: string = 'Ad versionem monstrandam';
  showVersion: boolean = false;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.showHideVersion.pipe(takeUntil(this.destroyed)).subscribe(value =>{
      this.showVersion = value;
    })
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query => {
        this.query = query;

        if(query){

          this.limit = query.limit;

          this.total = query.total;
  
          this.index = query.index;
        }
      });

      this.searchService.isLoading.pipe(takeUntil(this.destroyed)).subscribe(isLoading=>{
        this.isLoading = isLoading;
      });
  }

  export(){
    
  }

  reserch(){
    this.searchService.resetQuery(this.query);
  }

  loadPage(page: PageEvent): any {
    this.query.index = page.pageIndex;
    this.query.skip = page.pageIndex * AppConfig.DefaultPageLimit;
    this.searchService.getChunks(this.query);
  }

  showHideVersio(){
    this.searchService.showHideVersion.next(!this.searchService.showHideVersion.getValue());
    if (this.searchService.showHideVersion.getValue()) {
      this.showVersionTooltip = 'Ad versionem occultandam';
    } else {
      this.showVersionTooltip = 'Ad versionem monstrandam';
    }
  }
}
