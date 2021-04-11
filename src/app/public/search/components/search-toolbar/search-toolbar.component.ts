import { Component, OnInit } from '@angular/core';
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
  disabled: boolean;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query => {
        this.query = query;
      });
      this.searchService.rawValue.pipe(takeUntil(this.destroyed)).subscribe(value=>{
        this.disabled = value == undefined;
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
