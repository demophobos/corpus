import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-distance-condition',
  templateUrl: './distance-condition.component.html',
  styleUrls: ['./distance-condition.component.scss']
})
export class DistanceConditionComponent extends BaseComponent implements OnInit {
  formGroup: FormGroup;
  query: ChunkQuery;
  options: any = [
    {value: 0, name: '-0-'}, 
    {value: 1, name: '-1-'}, 
    {value: 2, name: '-2-'},
    {value: 3, name: '-3-'}, 
    {value: 4, name: '-4-'}, 
    {value: 5, name: '-5-'},
    {value: 6, name: '-6-'}, 
    {value: 7, name: '-7-'}, 
    {value: 8, name: '-8-'},
    {value: 9, name: '-9-'}
  ];
  disabled: boolean = true;
  constructor(public fb: FormBuilder, private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      optionControl: [{value: 0, disabled: this.disabled}, [ Validators.required ] ],
    });
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query => {
      this.query = query;
    });
    this.searchService.wordCombValue.pipe(takeUntil(this.destroyed)).subscribe(value=>{
      if(value == "phrase" || value == "or"){
        this.formGroup.controls.optionControl.setValue(this.options[0].value);
        this.formGroup.controls.optionControl.disable();
        this.disabled = true;
      }else{
        this.formGroup.controls.optionControl.enable();
        this.disabled = false;
      }
    })
    this.searchService.rawValue.pipe(takeUntil(this.destroyed)).subscribe(value=>{
      if(value === undefined){
        this.formGroup.controls.optionControl.disable();
        this.disabled = true;
      }else{
        if(value.split(' ').length == 1){
          this.formGroup.controls.optionControl.setValue(this.options[0].value);
          this.formGroup.controls.optionControl.disable();
          this.disabled = true;
        }else{
          this.formGroup.controls.optionControl.enable();
          this.disabled = false;
        }
      } 
    });
    this.onChanges();
  }
  onChanges(): void {
    this.formGroup.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((value) => {
        this.query.valueIp = value.optionControl;
        this.searchService.distanceValue.next(this.query.valueIp);
      });
  }
}
