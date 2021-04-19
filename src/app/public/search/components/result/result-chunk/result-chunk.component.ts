import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@shared/components';
import { Language } from '@shared/enums';
import { ChunkView } from '@shared/models';
import { CommonDataService } from '@shared/services/common-data.service';
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
  constructor(private searchService: SearchService, private router: Router, private commonDataService: CommonDataService) {
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

  showHideVersio() {
    this.showInterp = !this.showInterp;
    this.loadInterpData();
  }

  showHideContext(){
    this.router.navigate(['index'], {state: {headerId: this.chunk.headerId, indexName: this.chunk.indexName }});
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
