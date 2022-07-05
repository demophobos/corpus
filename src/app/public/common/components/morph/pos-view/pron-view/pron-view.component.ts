import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkValueItemModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';

@Component({
  selector: 'app-pron-view',
  templateUrl: './pron-view.component.html',
  styleUrls: ['../common/pos-view-common.scss'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class PronViewComponent  extends BaseComponent implements OnInit {

  @Input() morphInfo: ChunkValueItemModel;

  constructor(private searchService: SearchService) { 
    super();
  }

  ngOnInit(): void {
  }

}
