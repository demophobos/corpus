import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent extends BaseComponent implements OnInit {
  query: ChunkQuery;
  isLoading: boolean;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
        this.query = query;
    });
    this.searchService.isLoading.pipe(takeUntil(this.destroyed)).subscribe(isLoading=>{
      this.isLoading = isLoading;
    });
  }
}
