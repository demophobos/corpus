import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BaseComponent } from '@shared/components';
import {
  ChunkValueItemModel,
  ChunkView,
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
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    if(this.searchService.currentForm.value){
      this.hasMorphology = this.searchService.currentForm.value.pos.length > 0;
      this.searchService.noteLinks
      .pipe(takeUntil(this.destroyed))
      .subscribe((links: NoteLinkModel[]) => {
        if (links.length > 0) {
          this.hasComments =
            links.map((i) => i.itemId).indexOf(this.searchService.currentForm.value['_id']) > -1;
        }
      });
    }
  }
}
