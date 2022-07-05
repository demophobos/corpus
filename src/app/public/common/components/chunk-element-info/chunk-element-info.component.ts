import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BaseComponent } from '@shared/components';
import { NoteLinkModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chunk-element-info',
  templateUrl: './chunk-element-info.component.html',
  styleUrls: ['./chunk-element-info.component.scss']
})
export class ChunkElementInfoComponent extends BaseComponent implements OnInit {
  hasMorphology: boolean = false;
  hasComments: boolean = false;
  constructor(private searchService: SearchService, private bottomSheet: MatBottomSheet) {
    super();
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
