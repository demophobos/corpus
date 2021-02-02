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
  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
    super();
    this.editorForm = this.formBuilder.group({
      valueControl: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.onChanges();
    this.searchService.chunkQuery.subscribe(query=>{
      this.query = query;
      this.editorForm.controls.valueControl.setValue(this.query.value);
    });

  }
  
  onChanges(): void {
    this.editorForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((val) => {
        this.query.value = val.valueControl;
      });
  }

  applyFilter(value){
    let test = value; 
  }
}
