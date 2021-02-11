import { Component, Input, OnInit } from '@angular/core';
import { ChunkView } from '@shared/models';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-chunk-info',
  templateUrl: './chunk-info.component.html',
  styleUrls: ['./chunk-info.component.scss']
})
export class ChunkInfoComponent implements OnInit {
  @Input() chunk: ChunkView;
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {

  }
  getInfo(chunk: ChunkView) {
    this.searchService.setCommentable = chunk;
  }
}
