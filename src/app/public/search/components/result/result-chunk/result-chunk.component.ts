import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkView } from '@shared/models';

import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-result-chunk',
  templateUrl: './result-chunk.component.html',
  styleUrls: ['./result-chunk.component.scss'],
})
export class ResultChunkComponent extends BaseComponent implements OnInit {
  @Input() chunk: ChunkView;
  @Input() isParallel: boolean = false;
  @Output() showHideVersionEvent: EventEmitter<void> = new EventEmitter();

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    if (this.chunk) {
      this.searchService.getNoteLinks(this.chunk.indexId);
    }
  }

  showHideVersio() {
    this.showHideVersionEvent.emit();
  }
}
