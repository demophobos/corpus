import { Component, OnInit } from '@angular/core';
import { IndexView } from '@shared/models';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-index-selector',
  templateUrl: './index-selector.component.html',
  styleUrls: ['./index-selector.component.scss']
})
export class IndexSelectorComponent implements OnInit {
  indeces: IndexView[];
  constructor(private indexService: IndexService) { }

  ngOnInit(): void {
    this.indexService.selectedHeader.subscribe(header=>{
      this.indexService.getIndeces(header.id).then(indeces=>{
        this.indeces = indeces;
      });
    })
  }
  indexChanged($event){

  }
}
