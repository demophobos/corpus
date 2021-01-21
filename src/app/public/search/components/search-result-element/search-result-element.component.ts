import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { ChunkQuery, ElementView } from '@shared/models';
import { DialogService } from '@shared/services';
import { basename } from 'path';
import { ElementHelper } from 'protractor';
import { take, takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { MorphInfoComponent } from '../morph-info/morph-info.component';

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
  morphIds: string[];

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    if (this.element) {
      this.isMorphStyle = this.element.morphId !== null;
    }

    this.searchService.currentQuery.pipe(takeUntil(this.destroyed)).subscribe((query: ChunkQuery) => {
        this.query = query;
      });

    this.searchService.morphIds.pipe(takeUntil(this.destroyed)).subscribe((morphIds: string[]) => {
        this.morphIds = morphIds;
      });


      if (this.morphIds?.indexOf(this.element.morphId) > -1) {

        this.isSelected = true;

      } 
      else {
        this.isSelected = this.element.value.toLowerCase() == this.query.value.toLowerCase();

        this.isNotMorphStyle = this.isSelected && this.element.morphId == null;
        
      }
  }

}
