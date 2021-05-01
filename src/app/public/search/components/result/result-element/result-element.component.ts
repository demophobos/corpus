import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkQuery, ChunkValueItemModel, ElementView, MorphModel, NoteLinkModel } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-result-element',
  templateUrl: './result-element.component.html',
  styleUrls: ['./result-element.component.scss']
})
export class ResultElementComponent
  extends BaseComponent
  implements OnInit {
  @Input() element: any;
  @Input() selectedValue: string;
  isMorphStyle: boolean = false;
  isNotMorphStyle: boolean = false;
  isSelected: boolean = false;
  isCommented: boolean = false;
  query: ChunkQuery;
  morphIds: MorphModel[];
  posTooltip: string;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    if (this.element) {
      this.isMorphStyle = this.element.morphId !== undefined;
      this.posTooltip = this.element.morphId !== undefined ? JSON.stringify(this.searchService.getPosView(this.element), null, 8) : "";
      this.posTooltip = this.posTooltip.replace('{', '').replace('}', '').replace( /"/g, '' ).replace( /,/g, '' ).replace(/_/g, ' ');
    }

    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe((query: ChunkQuery) => {
        this.query = query;
      });

    this.searchService.foundForms.pipe(takeUntil(this.destroyed)).subscribe((morphIds: MorphModel[]) => {

        this.morphIds = morphIds;

        this.isSelected = this.morphIds?.find(i=>i.id == this.element.morphId) !== undefined;
      
      });

      this.searchService.noteLinks.pipe(takeUntil(this.destroyed)).subscribe((links: NoteLinkModel[])=>{
        if(this.element && links.length > 0) {
          this.isCommented = links.map(i=>i.itemId).indexOf(this.element._id) > -1;
        }
      });
  }

  selectWord(word: ChunkValueItemModel){
    this.searchService.setCommentable = word;
  }

}
