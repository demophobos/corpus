import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@shared/components';
import { Language } from '@shared/enums';
import { ChunkView } from '@shared/models';
import { SearchService } from '../../../services/search.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private searchService: SearchService, private router: Router, private clipboard: Clipboard, private snackBar: MatSnackBar) {
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

  copyChunk(){

    let chunkCopy = `[${this.chunk.indexName}] ${this.chunk.value} [${this.chunk.headerCode}]`;

    if(this.showInterp && !this.interpIsLoading){
      chunkCopy += `\n`;
      this.interpChunks.forEach((interp)=>{
        chunkCopy += `[${interp.indexName}] ${interp.value} [${interp.headerCode}]`;
        chunkCopy += `\n`;
      });
      this.clipboard.copy(chunkCopy);
    }else{
      this.clipboard.copy(chunkCopy);
    }
    this.snackBar.open(`Exemplar fragmenti [${this.chunk.headerCode}, ${this.chunk.indexName}] factum'st`, 'Claudere', {
      duration: 3000,
    });
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
