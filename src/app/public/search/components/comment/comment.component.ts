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
  word: ElementView;
  wordUsageCount: Number;
  panelOpenState = true;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.commentable.pipe(takeUntil(this.destroyed)).subscribe(comment=>{
      
      if(comment instanceof ChunkElementView){
        this.chunk = comment as ChunkElementView;
      }else{
        this.word = comment as ElementView;
      }
    });
  }

  showUsage(){
    if(this.word){
      this.searchService.countWordUsage(this.word.value).then((result: Number)=>{
        this.wordUsageCount = result;
      });
    }
  }
}
