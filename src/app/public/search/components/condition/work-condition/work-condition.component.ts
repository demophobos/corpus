import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { ChunkQuery, HeaderModel } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-work-condition',
  templateUrl: './work-condition.component.html',
  styleUrls: ['./work-condition.component.scss']
})
export class WorkConditionComponent extends BaseComponent implements OnInit {
  headerSelector = new FormControl();
  headers: HeaderModel[];
  query: ChunkQuery;
  constructor(private searchService: SearchService) {
    super();
  }

  async ngOnInit(): Promise<void> {

    this.searchService.headers.pipe(takeUntil(this.destroyed)).subscribe(headers => {
      this.headers = headers;
    });

    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
      if(this.query && this.query.headers){
        this.headerSelector.setValue(this.query.headers);
      }
    });

    this.headerSelector.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((values : string[])=>{
      if(this.query){
        this.query.headers = values;
        this.searchService.setSelectedWorksCount(this.query);
      }
    });

  }
}
