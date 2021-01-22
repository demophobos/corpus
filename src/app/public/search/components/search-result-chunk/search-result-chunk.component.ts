import {Component, Input, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '@shared/components';
import { Language } from '@shared/enums';
import { ChunkElementView, ChunkView } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result-chunk',
  templateUrl: './search-result-chunk.component.html',
  styleUrls: ['./search-result-chunk.component.scss'],
})
export class SearchResultChunkComponent extends BaseComponent implements OnInit {
  showInterp: boolean = false;
  interpIsLoading: boolean = true;
  @Input() chunk: ChunkElementView;
  interpChunks: ChunkElementView[];
  emptyInterpInfo: string;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    
  }

  loadComment(){
    this.searchService.showCommentPane(true);
    this.searchService.loadComment(this.chunk);
  }

  loadInterp() {
    this.showInterp = !this.showInterp;
    if(this.showInterp){
      this.interpIsLoading = true;
      this.searchService.getInterp(this.chunk.id, this.chunk.headerLang == Language.Latin)
      .then((values: ChunkElementView[])=>{
        if(values.length > 0){
          this.interpChunks = values;
        }else{
          this.emptyInterpInfo = "versiones desunt";
        }
      }).then(()=>{
        this.interpIsLoading = false;
        Promise.resolve();
      });
    }else{
      this.interpChunks = null;
    }
  }
}
