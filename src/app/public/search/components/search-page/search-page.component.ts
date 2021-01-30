import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
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

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.showComment.pipe(takeUntil(this.destroyed)).subscribe(showComment=>{
      this.commentPaneSize = showComment ? 20 : 0;
      this.searchResultPaneSize = showComment ? 80 : 100;
    })
  }
}
