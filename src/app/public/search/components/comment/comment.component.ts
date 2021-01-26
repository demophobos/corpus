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
    this.searchService.selectedWord.pipe(takeUntil(this.destroyed)).subscribe(word=>{
      if(word){
        this.word = word;
        this.searchService.countWordUsage(this.word.value).then((result: Number)=>{
          this.wordUsageCount = result;
        });
      }
    });
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

  showUsage(){
    if(this.word){
      this.searchService.countWordUsage(this.word.value).then((result: Number)=>{
        this.wordUsageCount = result;
      });
    }
  }
}
