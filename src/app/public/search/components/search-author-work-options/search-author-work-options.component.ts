import { query } from '@angular/animations';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { ChunkQuery, HeaderModel } from '@shared/models';
import { take, takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-author-work-options',
  templateUrl: './search-author-work-options.component.html',
  styleUrls: ['./search-author-work-options.component.scss']
})
export class SearchAuthorWorkOptionsComponent extends BaseComponent implements OnInit {
  headerSelector = new FormControl();
  headers: HeaderModel[];
  query: ChunkQuery;
  constructor(private searchService: SearchService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.headers = await this.searchService.getHeaders();

    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
      if(this.query && this.query.headers){
        this.headerSelector.setValue(this.query.headers);
      }
    });

    this.headerSelector.valueChanges.subscribe((values : string[])=>{
      if(this.query){
        this.query.headers = values;
      }
    });
  }
}
