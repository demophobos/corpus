import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkValueItemModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['../common/pos-view-common.scss'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class ArticleViewComponent  extends BaseComponent implements OnInit {

  @Input() morphInfo: ChunkValueItemModel;

  constructor(private searchService: SearchService) { 
    super();
  }

  ngOnInit(): void {
  }

}
