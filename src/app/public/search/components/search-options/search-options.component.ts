import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@shared/components';
import { FormSearchType } from '@shared/enums';
import { ElementQuery } from '@shared/models';
import { basename } from 'path';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss'],
})
export class SearchOptionsComponent extends BaseComponent implements OnInit {
  panelOpenState = true;
  caseVisible = true;
  optionsForm: FormGroup;
  query: ElementQuery;
  constructor(private fb: FormBuilder, private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.currentQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
      this.caseVisible = this.query.formSearchType == FormSearchType.Free;
      if(this.query.formSearchType !== FormSearchType.Free){
        this.query.caseSensitive = false;
      }
    });

    this.optionsForm = this.fb.group({
      options: [this.query.formSearchType],
      caseFormControl: new FormControl(this.query.caseSensitive),
    });

    this.optionsForm.controls.caseFormControl.setValue(this.query.caseSensitive);

    this.onChanges();
  }

  onChanges(): void {
    this.optionsForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((val) => {
      if (val.options) {
        this.query.formSearchType = val.options;
      } else {
        this.query.formSearchType = FormSearchType.Free
      }
      if(val.caseFormControl){
        this.query.caseSensitive = val.caseFormControl;
      }

      this.caseVisible = this.query.formSearchType == FormSearchType.Free;

      if(this.query.formSearchType !== FormSearchType.Free){
        this.query.caseSensitive = false;
      }
    });
  }
}
