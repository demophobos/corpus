import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkValueItemModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';

@Component({
  selector: 'app-morph',
  templateUrl: './morph.component.html',
  styleUrls: ['./morph.component.scss']
})
export class MorphComponent extends BaseComponent implements OnInit {
  @Input() morphInfo: ChunkValueItemModel;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    if (this.searchService.currentForm.value) {
      this.morphInfo = this.searchService.currentForm.getValue();
    }
  }
}
