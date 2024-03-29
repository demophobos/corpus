import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { WordMatchCombEnum } from '@shared/enums/word-match-comb-enum';
import { ChunkQuery } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-word-comb-condition',
  templateUrl: './word-comb-condition.component.html',
  styleUrls: ['./word-comb-condition.component.scss']
})
export class WordCombConditionComponent extends BaseComponent implements OnInit {
  formGroup: UntypedFormGroup;
  query: ChunkQuery;
  options: any = [
    {value: 'or', name: WordMatchCombEnum.AnyWord}, 
    {value: 'and', name: WordMatchCombEnum.AllWords}, 
    //{value: 'phrase', name: WordMatchCombEnum.Phrase}
  ];
  disabled: boolean = true;
  constructor(public fb: UntypedFormBuilder, private searchService: SearchService, private deviceService: DeviceDetectorService) { 
    super(deviceService);
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      optionControl: [{value: 'or', disabled: this.disabled}, [ Validators.required ] ],
    });
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query => {
      this.query = query;
      this.formGroup.controls.optionControl.setValue(this.query.valueOp);
    });
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
        this.query.valueOp = value.optionControl;
        this.searchService.wordCombValue.next(this.query.valueOp);
      });
  }

}
