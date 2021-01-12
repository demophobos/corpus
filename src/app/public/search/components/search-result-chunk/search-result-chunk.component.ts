import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '@shared/components';
import { ElementView } from '@shared/models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result-chunk',
  templateUrl: './search-result-chunk.component.html',
  styleUrls: ['./search-result-chunk.component.scss']
})
export class SearchResultChunkComponent extends BaseComponent implements OnInit  {

  @Input() elements: ElementView[]
  chunk: ElementView;
  constructor(private snackBar: MatSnackBar, private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.chunk = this.elements[0];
  }

  getInfo(){
    this.searchService.getIndex(this.chunk.indexId).then(result =>{
      this.snackBar.open(`${result.headerDesc}`, 'Текст');
    });
  }
}
