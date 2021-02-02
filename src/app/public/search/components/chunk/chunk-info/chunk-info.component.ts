import { Component, Input, OnInit } from '@angular/core';
import { ChunkElementView } from '@shared/models';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-chunk-info',
  templateUrl: './chunk-info.component.html',
  styleUrls: ['./chunk-info.component.scss']
})
export class ChunkInfoComponent implements OnInit {
  @Input() chunk: ChunkElementView;
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {

  }
  getInfo(chunk: ChunkElementView) {
    this.searchService.setCommentable = chunk;
  }
}
