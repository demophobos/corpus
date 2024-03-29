import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BaseComponent } from '@shared/components';
import { ChunkQuery, ChunkValueItemModel, ChunkView, MorphModel, NoteLinkModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';
import { ChunkElementInfoComponent } from '../chunk-element-info/chunk-element-info.component';

@Component({
  selector: 'app-chunk-element',
  templateUrl: './chunk-element.component.html',
  styleUrls: ['./chunk-element.component.scss']
})
export class ChunkElementComponent extends BaseComponent implements OnInit {
  @Input() chunk: ChunkView;
  @Input() element: any;
  @Input() selectedValue: string;
  isMorphStyle: boolean = false;
  isNotMorphStyle: boolean = false;
  isSelected: boolean = false;
  isCommented: boolean = false;
  query: ChunkQuery;
  morphIds: MorphModel[];
  posTooltip: string;

  constructor(
    private searchService: SearchService,
    private bottomSheet: MatBottomSheet
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.element) {
      this.isMorphStyle = this.element.morphId !== undefined;
    }

    this.searchService.chunkQuery
      .pipe(takeUntil(this.destroyed))
      .subscribe((query: ChunkQuery) => {
        this.query = query;
      });

    this.searchService.foundForms
      .pipe(takeUntil(this.destroyed))
      .subscribe((morphIds: MorphModel[]) => {
        this.morphIds = morphIds;

        this.isSelected =
          this.morphIds?.find((i) => i.id == this.element.morphId) !==
          undefined;
      });

    this.searchService.noteLinks
      .pipe(takeUntil(this.destroyed))
      .subscribe((links: NoteLinkModel[]) => {
        if (this.element && links.length > 0) {
          this.isCommented =
            links.map((i) => i.itemId).indexOf(this.element._id) > -1;
        }
      });
  }

  selectForm(form: ChunkValueItemModel) {
    this.searchService.setCurrentChunk = this.chunk;
    this.searchService.setCurrentForm = form;
    if (form.pos || this.isCommented) {
      this.bottomSheet.open(ChunkElementInfoComponent, {
        hasBackdrop: false,
        autoFocus: 'first-tabbable',
        closeOnNavigation: true
      });
    } else {
      this.bottomSheet.dismiss();
    }
  }
}
