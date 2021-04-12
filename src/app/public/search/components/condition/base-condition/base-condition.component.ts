import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-base-condition',
  templateUrl: './base-condition.component.html',
  styleUrls: ['./base-condition.component.scss'],
})
export class BaseConditionComponent extends BaseComponent implements OnInit {
  editorForm: FormGroup;
  query: ChunkQuery;
  disabled: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {
    super();
    this.editorForm = this.formBuilder.group({
      valueControl: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.onChanges();
    this.searchService.chunkQuery.subscribe((query) => {
      this.query = query;
      this.editorForm.controls.valueControl.setValue(this.query.value);
    });
    this.searchService.rawValue.pipe(takeUntil(this.destroyed)).subscribe(value=>{
      this.disabled = value == undefined;
    });
  }

  onChanges(): void {
    this.editorForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((value) => {
      if(value.valueControl){
        let rawValue = value.valueControl.trim();
        this.query.value = rawValue == '' ? undefined : rawValue;
        this.searchService.rawValue.next(this.query.value);
      }else{
        this.query.value = undefined;
      }
      this.searchService.rawValue.next(this.query.value);
    });
  }

  async search() {
    this.searchService.resetQuery(this.query);
    this.searchService.getChunks(this.query);
  }

  clear(){
    this.searchService.initQuery();
  }
}
