import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '@shared/constants';
import { DialogService } from '@shared/services';
import { SearchSettingsComponent } from '../search-settings/search-settings.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchDisabled: boolean = true;
  settingsDisabled: boolean = false;
  clearDisabled: boolean = true;

  public editorForm = new FormGroup({
    formFormControl: new FormControl('')
  });
  
  constructor(private readonly dialogService: DialogService) { }

  ngOnInit(): void {
  }

  valueChange(val:string){
    this.searchDisabled = this.clearDisabled = val.length == 0;
  }

  clear(){
    this.editorForm.controls.formFormControl.setValue('');
    this.searchDisabled = this.clearDisabled = true;
  }

  search(){


  }
  setSettings(){
    this.dialogService
      .showComponent(
        SearchSettingsComponent,
        null,
        AppConfig.DefaultDialogWidth
      )
      .toPromise();
  }
}
