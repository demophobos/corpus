import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { ElementQuery, ElementView } from '@shared/models';
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
export class SearchResultElementComponent extends BaseComponent implements OnInit {
  @Input() element: ElementView;
  @Input() selectedValue: string;
  isMorphStyle: boolean = false;
  isSelected: boolean = false;
  constructor(private searchService: SearchService, private dialogService: DialogService) {
    super();
  }

  ngOnInit(): void {
    if (this.element) {
      this.isMorphStyle = this.element.morphId !== null;
    }
    this.searchService.currentQuery.pipe(takeUntil(this.destroyed)).subscribe((query: ElementQuery) => {
      this.selectedValue = query.value;
      if(this.selectedValue){
        if (this.element && !query.caseSensitive) {
          this.isSelected = this.element.value.toLowerCase() == this.selectedValue.toLowerCase();
        } else {
          this.isSelected = this.element.value == this.selectedValue;
        }
      }
    });

    this.searchService.morphIds.subscribe((morphIds: string[])=>{
      this.isSelected = morphIds.indexOf(this.element.morphId) > -1
    });
  }
  morphSelected(element: ElementView) {
    //this.dialogService.showComponent(MorphInfoComponent, element, AppConfig.DefaultDialogWidth, false);
  }
}
  