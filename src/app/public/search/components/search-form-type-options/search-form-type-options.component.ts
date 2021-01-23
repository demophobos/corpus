import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { FormSearchType } from '@shared/enums';
import { ChunkQuery } from '@shared/models';
import { basename } from 'path';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-form-type-options',
  templateUrl: './search-form-type-options.component.html',
  styleUrls: ['./search-form-type-options.component.scss'],
})
export class SearchFormTypeOptionsComponent extends BaseComponent implements OnInit {
  panelOpenState = true;
  optionsForm: FormGroup;
  query: ChunkQuery;
  constructor(private fb: FormBuilder, private searchService: SearchService) {
    super();

    this.optionsForm = this.fb.group({
      options: [AppConfig.DefaultSearchTypeValue]
    });
  }

  ngOnInit(): void {
    this.searchService.currentQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
    });
    
    

    if(this.query){
      this.optionsForm.controls.options.setValue(this.query.formSearchType);
    }
   

    this.onChanges();
  }

  onChanges(): void {
    this.optionsForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((val) => {
      if (val.options) {
        this.query.formSearchType = val.options;
      } else {
        this.query.formSearchType = FormSearchType.Form
      }
    });
  }
}
