import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkValueItemModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';

@Component({
  selector: 'app-adj-view',
  templateUrl: './adj-view.component.html',
  styleUrls: ['../common/pos-view-common.scss'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class AdjViewComponent extends BaseComponent implements OnInit {

  @Input() morphInfo: ChunkValueItemModel;

  constructor(private searchService: SearchService) { 
    super();
  }

  ngOnInit(): void {
  }

}
