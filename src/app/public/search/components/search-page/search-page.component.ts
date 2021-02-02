import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ConditionTypeEnum } from '@shared/enums';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent extends BaseComponent implements OnInit {

  searchResultPaneSize = 100;
  commentPaneSize = 0;
  conditionPaneSize = 0;
  conditionType: ConditionTypeEnum = ConditionTypeEnum.Morph;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.commentPaneState.pipe(takeUntil(this.destroyed)).subscribe(showComment=>{
      this.commentPaneSize = showComment ? 20 : 0;
      this.searchResultPaneSize = showComment ? 80 : 100;
    });

    this.searchService.conditionPaneState.pipe(takeUntil(this.destroyed)).subscribe(showCondition=>{
      this.conditionPaneSize = showCondition ? 20 : 0;
      this.searchResultPaneSize = showCondition ? 80 : 100;
    })
  }

  showWorks(){
    this.conditionType = ConditionTypeEnum.Works;
  }

  showMorph(){
    this.conditionType = ConditionTypeEnum.Morph;
  }
}
