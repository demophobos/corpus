import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { NavigationStart, Router } from '@angular/router';
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
  constructor(private searchService: SearchService, private bottomSheet: MatBottomSheet,
    private router: Router) {
    super();
    router.events
    .pipe(takeUntil(this.destroyed))
    .subscribe((event: NavigationStart) => {
      if (event.url !== '/index') {
        this.bottomSheet.dismiss();
      }
    });
  }

  ngOnInit(): void {
    if(this.searchService.currentForm.value){
      this.hasMorphology = this.searchService.currentForm.value.pos != undefined;
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
