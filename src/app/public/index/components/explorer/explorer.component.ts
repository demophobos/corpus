import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkView } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent extends BaseComponent implements OnInit {
  chunk: ChunkView;
  constructor(private indexService: IndexService) {
    super();
  }

  ngOnInit(): void {

    this.indexService.selectedIndex.pipe(takeUntil(this.destroyed)).subscribe(index=>{
      if(index){
        this.indexService.getChunk(index).then(chunk=>{
          this.chunk = chunk;
          Promise.resolve();
        });
      }else{
        this.chunk = undefined;
      }
    })
  }
}
