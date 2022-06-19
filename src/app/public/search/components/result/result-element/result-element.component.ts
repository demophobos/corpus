import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BaseComponent } from '@shared/components';
import {
  ChunkQuery,
  ChunkValueItemModel,
  MorphModel,
  NoteLinkModel,
} from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';
import { ResultMetaInfoComponent } from '../result-meta-info/result-meta-info.component';

@Component({
  selector: 'app-result-element',
  templateUrl: './result-element.component.html',
  styleUrls: ['./result-element.component.scss'],
})
export class ResultElementComponent extends BaseComponent implements OnInit {
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

  selectWord(word: ChunkValueItemModel) {
    this.searchService.setCommentable = word;
    if (word.pos.length > 0 || this.isCommented) {
      this.bottomSheet.open(ResultMetaInfoComponent, {
        hasBackdrop: false,
        autoFocus: 'first-tabbable'
      });
    } else {
      this.bottomSheet.dismiss();
    }
  }
}
