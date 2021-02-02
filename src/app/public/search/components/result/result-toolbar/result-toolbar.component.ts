import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { ChunkQuery } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-result-toolbar',
  templateUrl: './result-toolbar.component.html',
  styleUrls: ['./result-toolbar.component.scss'],
})
export class ResultToolbarComponent extends BaseComponent implements OnInit {
  query: ChunkQuery;
  index: number;
  total: number;
  limit: number;
  isLoading: boolean = false;
  pageEvent: PageEvent;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.chunkQuery
      .pipe(takeUntil(this.destroyed))
      .subscribe((query) => {
        this.query = query;

        if(query){

          this.limit = query.limit;

          this.total = query.total;
  
          this.index = query.index;
        }
      });

      this.searchService.isLoading.pipe(takeUntil(this.destroyed)).subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  export(){

  }

  loadPage(page: PageEvent): any {
    this.query.index = page.pageIndex;
    this.query.skip = page.pageIndex * AppConfig.DefaultPageLimit;
    this.searchService.getChunks(this.query);
  }
}
