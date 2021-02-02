import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-condition',
  templateUrl: './form-condition.component.html',
  styleUrls: ['./form-condition.component.scss']
})
export class FormConditionComponent extends BaseComponent implements OnInit {
  editorForm: FormGroup;
  query: ChunkQuery;
  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
    super();
    this.editorForm = this.formBuilder.group({
      checkControl: new FormControl('0')
    });
  }

  ngOnInit(): void {
    this.onChanges();
    this.searchService.chunkQuery.subscribe(query=>{
      this.query = query;
      this.editorForm.controls.checkControl.setValue(this.query.searchLemma == true ? '1' : '0');
    });
  }

  onChanges(): void {
    this.editorForm.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((val) => {
        this.query.searchLemma = val.checkControl == '0' ? false : true;
      });
  }

}
