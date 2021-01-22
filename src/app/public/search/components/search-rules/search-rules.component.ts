import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-rules',
  templateUrl: './search-rules.component.html',
  styleUrls: ['./search-rules.component.scss']
})
export class SearchRulesComponent extends BaseComponent implements OnInit {
  searchDisabled: boolean = true;
  settingsDisabled: boolean = false;
  clearDisabled: boolean = true;
  query: ChunkQuery;
  editorForm: FormGroup;
  
  constructor(private searchService: SearchService,
    private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      formFormControl: new FormControl('')
    });

    this.searchService.currentQuery.subscribe(query=>{
      this.query = query;
    })

    if (this.query ) {
      this.editorForm.controls.formFormControl.setValue(this.query.value);
      this.searchDisabled = false;
      this.clearDisabled = false;
    }else{
      this.query = new ChunkQuery({});
    }

    this.onChanges();
  }

  onChanges(): void {
    this.editorForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((val) => {

        if (val.formFormControl) {

          this.searchDisabled = this.clearDisabled = val.formFormControl.length == 0;

          this.query.value = val.formFormControl;

        } else {

          this.searchDisabled = this.clearDisabled = true;

        }
        
      });
  }

  clear() {
    this.editorForm.controls.formFormControl.setValue('');
    this.searchDisabled = this.clearDisabled = true;
    this.searchService.removeLocalStorageQuery();
  }

  async search() {
    this.searchService.resetQuery(this.query);
    this.searchService.getChunks(this.query);
  }


  close(){
    
  }
}
