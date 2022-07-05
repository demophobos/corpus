import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkView } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';

@Component({
  selector: 'app-chunk',
  templateUrl: './chunk.component.html',
  styleUrls: ['./chunk.component.scss']
})
export class ChunkComponent extends BaseComponent implements OnInit {
  @Input() chunk: ChunkView;
  @Input() isParallel: boolean = false;
  @Input() showHeaderCode: boolean = true;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    if (this.chunk) {
      this.searchService.getNoteLinks(this.chunk.indexId);
    }
  }
}
