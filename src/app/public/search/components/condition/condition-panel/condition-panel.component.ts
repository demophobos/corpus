import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';
import { SearchPageComponent } from '../../search-page/search-page.component';

@Component({
  selector: 'app-condition-panel',
  templateUrl: './condition-panel.component.html',
  styleUrls: ['./condition-panel.component.scss']
})
export class ConditionPanelComponent extends BaseComponent implements OnInit {
  query: ChunkQuery;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
    })
  }

}
