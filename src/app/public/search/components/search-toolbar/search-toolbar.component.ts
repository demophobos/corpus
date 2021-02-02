import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss'],
})
export class SearchResultToolbarComponent extends BaseComponent implements OnInit {

  query: ChunkQuery;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query => {
        this.query = query;
      });
  }

  async search() {
    this.searchService.resetQuery(this.query);
    this.searchService.getChunks(this.query);
  }

  clear(){
    this.searchService.initQuery();
  }
}
