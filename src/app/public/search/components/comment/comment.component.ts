import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ElementTypeEnum } from '@shared/enums';
import { ChunkElementView, ElementView } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent extends BaseComponent implements OnInit {
  chunk:ChunkElementView;
  words:ElementView[];
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.comment.pipe(takeUntil(this.destroyed)).subscribe(comment=>{
      this.chunk = comment;
      if(comment){
        this.words = comment.elements.filter(i=>i.type == ElementTypeEnum.Word);
      }
    });
  }
  close(){
    this.searchService.showCommentPane(false);
  }
}
