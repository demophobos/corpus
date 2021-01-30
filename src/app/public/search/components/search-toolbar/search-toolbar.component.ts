import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss']
})
export class SearchResultToolbarComponent extends BaseComponent implements OnInit {
  commentPaneIcon: string = "comment_open";
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.showComment.pipe(takeUntil(this.destroyed)).subscribe(open=>{
      this.commentPaneIcon = open ? "comment_close" : "comment_open";
    });
  }

  showHideCommentPane(){
    this.searchService.switchCommentPane = true;
  }

}
