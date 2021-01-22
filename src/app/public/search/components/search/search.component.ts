import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends BaseComponent implements OnInit {

  searchRulePaneSize = 20;
  searchResultPaneSize = 80;
  commentPaneSize = 0;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.showComment.pipe(takeUntil(this.destroyed)).subscribe(showComment=>{
      this.commentPaneSize = showComment ? 20 : 0;
      this.searchResultPaneSize = showComment ? 60 : 80;
    })
  }
}
