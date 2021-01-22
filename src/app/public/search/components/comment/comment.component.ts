import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkElementView } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent extends BaseComponent implements OnInit {
  chunk:ChunkElementView;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.comment.pipe(takeUntil(this.destroyed)).subscribe(comment=>{
      this.chunk = comment;
    })
  }
  close(){
    this.searchService.showCommentPane(false);
  }
}
