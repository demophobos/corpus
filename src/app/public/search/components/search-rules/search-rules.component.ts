import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { BaseComponent } from '@shared/components';
import { FormSearchTypeEnum } from '@shared/enums';
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
  panelOpenState = false;
  morphDisabled = false;
  selectedMorphAttributes: number = 0;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private searchService: SearchService,
    private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      valueControl: new FormControl(''),
      checkControl: new FormControl()
    });

    this.searchService.chunkQuery.subscribe(query=>{

      this.query = query;
      
      this.morphDisabled = this.query.formSearchType === FormSearchTypeEnum.Form;
      this.editorForm.controls.checkControl.setValue(this.query.formSearchType);
      this.editorForm.controls.valueControl.setValue(this.query.value);
      this.searchDisabled = false;
      this.clearDisabled = false;

      if(this.morphDisabled && this.accordion){
        this.accordion.closeAll();
      }
      this.searchService.selectedAttributesCount.subscribe(count=>{
        this.selectedMorphAttributes = count;
      })
    });

    this.onChanges();
  }

  onChanges(): void {
    this.editorForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((val) => {

        if (val.valueControl) {

          this.searchDisabled = this.clearDisabled = val.valueControl.length == 0;
          this.query.value = val.valueControl;

        } else {
          this.searchDisabled = this.clearDisabled = true;
        }

        this.morphDisabled = val.checkControl == false;

        if(this.morphDisabled && this.accordion){
          this.accordion.closeAll();
        }
        
      });
  }

  clear() {
    this.editorForm.controls.valueControl.setValue('');
    this.editorForm.controls.checkControl.setValue(false);
    this.morphDisabled = this.searchDisabled = this.clearDisabled = true;
    this.searchService.removeLocalStorageQuery();
  }

  async search() {
    this.query.formSearchType = this.editorForm.controls.checkControl.value;
    this.searchService.resetQuery(this.query);
    this.searchService.getChunks(this.query);
  }
}
