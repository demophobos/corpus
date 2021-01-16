import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppConfig } from '@shared/constants';
import { ElementQuery } from '@shared/models';
import { DialogService } from '@shared/services';
import { SearchService } from '../../services/search.service';
import { SearchSettingsComponent } from '../search-settings/search-settings.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchDisabled: boolean = true;
  settingsDisabled: boolean = false;
  clearDisabled: boolean = true;
  public editorForm: FormGroup;

  constructor(
    private readonly dialogService: DialogService,
    private searchService: SearchService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      formFormControl: new FormControl(''),
      caseFormControl: new FormControl(false)
    });

    this.onChanges();
  }

  onChanges(): void {
    this.editorForm.valueChanges.subscribe((val) => {
      if (val.formFormControl) {
        this.searchDisabled = this.clearDisabled =
          val.formFormControl.length == 0;
      } else {
        this.searchDisabled = this.clearDisabled = true;
      }
    });
  }

  clear() {
    this.editorForm.controls.formFormControl.setValue('');
    this.searchDisabled = this.clearDisabled = true;
  }

  search() {
    this.searchService.getElementsByValue(
      new ElementQuery({ 
        value:  this.editorForm.controls.formFormControl.value, 
        sense: this.editorForm.controls.caseFormControl.value
      })
    );
  }

  setSettings() {
    this.dialogService
      .showComponent(
        SearchSettingsComponent,
        null,
        AppConfig.DefaultDialogWidth
      )
      .toPromise();
  }
}
