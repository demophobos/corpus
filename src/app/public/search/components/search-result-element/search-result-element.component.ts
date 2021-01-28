import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkQuery, ElementView, MorphModel } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result-element',
  templateUrl: './search-result-element.component.html',
  styleUrls: ['./search-result-element.component.scss'],
})
export class SearchResultElementComponent
  extends BaseComponent
  implements OnInit {
  @Input() element: ElementView;
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
      this.isMorphStyle = this.element.morphId !== null;
    }

    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe((query: ChunkQuery) => {
        this.query = query;
      });

    this.searchService.foundForms.pipe(takeUntil(this.destroyed)).subscribe((morphIds: MorphModel[]) => {
        this.morphIds = morphIds;
      });


      if (this.morphIds?.find(i=>i.id == this.element.morphId) || this.morphIds?.find(i=>i.form.toLowerCase() == this.element.value.toLowerCase())) {
        this.isSelected = true;
      } 
      else {
        this.isSelected = this.element.value.toLowerCase() == this.query.value.toLowerCase();

        this.isNotMorphStyle = this.isSelected && this.element.morphId == null;
        
      }
  }

  selectWord(word: ElementView){
    this.searchService.setSelectedWord(word);
  }

}
