import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-base-condition',
  templateUrl: './base-condition.component.html',
  styleUrls: ['./base-condition.component.scss']
})
export class BaseConditionComponent extends BaseComponent implements OnInit {
  editorForm: FormGroup;
  query: ChunkQuery;
  searchDisabled: boolean = true;
  settingsDisabled: boolean = false;
  clearDisabled: boolean = true;
  constructor(private formBuilder: FormBuilder,
    private searchService: SearchService) {
    super();

    this.editorForm = this.formBuilder.group({
      valueControl: new FormControl(''),
      checkControl: new FormControl()
    });
  }

  ngOnInit(): void {
    
    this.onChanges();

    this.searchService.chunkQuery.subscribe(query=>{
      this.query = query;
      this.editorForm.controls.checkControl.setValue(this.query.searchLemma);
      this.editorForm.controls.valueControl.setValue(this.query.value);
    });

  }
  
  onChanges(): void {
    this.editorForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((val) => {
        if (val.valueControl) {
          this.searchDisabled = this.clearDisabled = val.valueControl.length == 0;
          this.query.value = val.valueControl;

        } else {
          this.searchDisabled = this.clearDisabled = true;
        }
      });
  }

  clear() {
    this.editorForm.controls.valueControl.setValue('');
    this.editorForm.controls.checkControl.setValue(false);
    this.searchDisabled = this.clearDisabled = true;
    this.searchService.removeLocalStorageQuery();
  }

  async search() {
    this.query.value = this.editorForm.controls.valueControl.value;
    this.query.searchLemma = this.editorForm.controls.checkControl.value;
    this.searchService.resetQuery(this.query);
    this.searchService.getChunks(this.query);
  }

}
