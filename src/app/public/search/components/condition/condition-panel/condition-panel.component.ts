import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-condition-panel',
  templateUrl: './condition-panel.component.html',
  styleUrls: ['./condition-panel.component.scss']
})
export class ConditionPanelComponent extends BaseComponent implements OnInit {
  query: ChunkQuery;
  morphItems: string[];
  workItems: string[];
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
    });

    this.searchService.selectedAttributes.pipe(takeUntil(this.destroyed)).subscribe(items=>{
      this.morphItems = items;
    });

    this.searchService.selectedWorks.pipe(takeUntil(this.destroyed)).subscribe(items=>{
      this.workItems = items;
    });
  }

  removeMorphItem(item){
    this.morphItems = this.morphItems.filter(i=> i !== item);
  }

  removeWorkItem(item){
    this.workItems = this.workItems.filter(i=> i !== item);
  }
}
