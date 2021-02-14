import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkQuery, ChunkValueItemModel, ElementView, MorphModel } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-result-element',
  templateUrl: './result-element.component.html',
  styleUrls: ['./result-element.component.scss'],
})
export class ResultElementComponent
  extends BaseComponent
  implements OnInit {
  @Input() element: ChunkValueItemModel;
  @Input() selectedValue: string;
  isMorphStyle: boolean = false;
  isNotMorphStyle: boolean = false;
  isSelected: boolean = false;
  query: ChunkQuery;
  morphIds: MorphModel[];

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    if (this.element) {
      this.isMorphStyle = this.element.morphId !== undefined;
    }

    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe((query: ChunkQuery) => {
        this.query = query;
      });

    this.searchService.foundForms.pipe(takeUntil(this.destroyed)).subscribe((morphIds: MorphModel[]) => {

        this.morphIds = morphIds;

        this.isSelected = this.morphIds?.find(i=>i.id == this.element.morphId) !== undefined;
      
      });
  }

  selectWord(word: ChunkValueItemModel){
    this.searchService.setCommentable = word;
  }

}
