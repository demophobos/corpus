import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkElementView, ElementView } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-comment-pane',
  templateUrl: './comment-pane.component.html',
  styleUrls: ['./comment-pane.component.scss']
})
export class CommentPaneComponent extends BaseComponent implements OnInit {
  chunk:ChunkElementView;
  word: ElementView;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.commentable.pipe(takeUntil(this.destroyed)).subscribe(comment=>{
      if(comment instanceof ChunkElementView){
        this.chunk = comment as ChunkElementView;
        this.word = undefined;
      }else{
        this.word = comment as ElementView;
        this.chunk  = undefined;
      }
    });
  }
}
