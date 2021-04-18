import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { BaseComponent } from '@shared/components';
import { Language } from '@shared/enums';
import { ChunkView } from '@shared/models';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-result-chunk',
  templateUrl: './result-chunk.component.html',
  styleUrls: ['./result-chunk.component.scss'],
})
export class ResultChunkComponent extends BaseComponent implements OnInit, OnChanges {
  showInterp: boolean = false;
  interpIsLoading: boolean = true;
  @Input() chunk: ChunkView;
  interpChunks: ChunkView[];
  emptyInterpInfo: string;
  constructor(private searchService: SearchService) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.chunk.currentValue == undefined){
      this.showInterp = false;
    }
    if(changes.chunk && changes.chunk.currentValue && changes.chunk.previousValue){
      if(changes.chunk.currentValue.id !== changes.chunk.previousValue.id && this.showInterp){
        this.loadInterpData();
      }
    }
  }

  ngOnInit(): void {
    
  }

  loadInterp() {
    this.showInterp = !this.showInterp;
    this.loadInterpData();
  }

  private loadInterpData() {
    if (this.showInterp) {
      this.interpIsLoading = true;
      this.searchService.getInterp(this.chunk.id, this.chunk.headerLang == Language.Latin)
        .then((values: ChunkView[]) => {
          if (values.length > 0) {
            this.interpChunks = values;
          } else {
            this.emptyInterpInfo = "versio deest";
          }
        }).then(() => {
          this.interpIsLoading = false;
          Promise.resolve();
        });
    } else {
      this.interpChunks = null;
    }
  }
}
