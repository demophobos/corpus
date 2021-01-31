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
export class SearchResultToolbarComponent
  extends BaseComponent
  implements OnInit {
  commentPaneIcon: string;
  conditionPaneIcon: string;
  conditionPaneButtonTooltip: string = 'Show conditions';
  commentPaneButtonTooltip: string = 'Show comments';
  query: ChunkQuery;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.switchConditionPane = false;

    this.searchService.switchCommentPane = false;

    this.searchService.chunkQuery
      .pipe(takeUntil(this.destroyed))
      .subscribe((query) => {
        this.query = query;
      });
    this.searchService.commentPaneState
      .pipe(takeUntil(this.destroyed))
      .subscribe((open) => {
        this.commentPaneIcon = open ? 'arrow_right' : 'arrow_left';
        this.commentPaneButtonTooltip = open
          ? 'Hide comments panel'
          : 'Show comments panel';
      });
    this.searchService.conditionPaneState
      .pipe(takeUntil(this.destroyed))
      .subscribe((open) => {
        this.conditionPaneIcon = open ? 'arrow_left' : 'arrow_right';
        this.conditionPaneButtonTooltip = open
          ? 'Hide conditions panel'
          : 'Show conditions panel';
      });
  }

  showHideConditionPane() {
    this.searchService.switchConditionPane = true;
  }

  showHideCommentPane() {
    this.searchService.switchCommentPane = true;
  }
}
