import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import {
  ChunkValueItemModel,
  ElementView,
  NoteLinkModel,
} from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-result-meta-info',
  templateUrl: './result-meta-info.component.html',
  styleUrls: ['./result-meta-info.component.scss'],
})
export class ResultMetaInfoComponent extends BaseComponent implements OnInit {
  hasMorphology: boolean = false;
  hasComments: boolean = false;
  data:any;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.commentable
      .pipe(takeUntil(this.destroyed))
      .subscribe((element: ChunkValueItemModel) => {
        this.hasMorphology = element.pos.length > 0;
        this.searchService.noteLinks
          .pipe(takeUntil(this.destroyed))
          .subscribe((links: NoteLinkModel[]) => {
            if (links.length > 0) {
              this.hasComments =
                links.map((i) => i.itemId).indexOf(element['_id']) > -1;
            }
          });
      });
  }
}
