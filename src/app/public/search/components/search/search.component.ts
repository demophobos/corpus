import { Component, destroyPlatform, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { FormSearchType } from '@shared/enums';
import { ElementQuery, ElementView } from '@shared/models';
import { DialogService } from '@shared/services';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { SearchOptionsComponent } from '../search-options/search-options.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends BaseComponent implements OnInit {
  searchDisabled: boolean = true;
  settingsDisabled: boolean = false;
  clearDisabled: boolean = true;
  query: ElementQuery;
  editorForm: FormGroup;

  constructor(
    private readonly dialogService: DialogService,
    private searchService: SearchService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      formFormControl: new FormControl(''),
      caseFormControl: new FormControl(false),
    });

    this.query = this.searchService.getLocalStorageQuery();

    if (this.query ) {
      this.editorForm.controls.formFormControl.setValue(this.query.value);
      this.editorForm.controls.caseFormControl.setValue(this.query.caseSensitive);
      this.searchDisabled = false;
      this.clearDisabled = false;
    }else{
      this.query = new ElementQuery({});
    }

    this.onChanges();
  }

  onChanges(): void {
    this.editorForm.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((val) => {
        if (val.formFormControl) {
          this.searchDisabled = this.clearDisabled =
            val.formFormControl.length == 0;
          if (val.formFormControl.length > 0) {
            this.query.value = val.formFormControl;
          }
        } else {
          this.searchDisabled = this.clearDisabled = true;
        }
      });
  }

  clear() {
    this.editorForm.controls.formFormControl.setValue('');
    this.editorForm.controls.caseFormControl.setValue(false);
    this.searchDisabled = this.clearDisabled = true;
    this.searchService.removeLocalStorageQuery();
  }

  search() {
    this.query.value = this.editorForm.controls.formFormControl.value;
    this.query.caseSensitive = this.editorForm.controls.caseFormControl.value;

    this.searchService.getChunks(this.query);
  }

  setSettings() {
    this.dialogService
      .showComponent(
        SearchOptionsComponent,
        this.query,
        AppConfig.DefaultDialogWidth
      )
      .toPromise();
  }
}
