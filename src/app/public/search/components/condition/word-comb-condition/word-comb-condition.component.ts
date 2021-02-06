import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WordMatchCombEnum } from '@shared/enums/word-match-comb-enum';

@Component({
  selector: 'app-word-comb-condition',
  templateUrl: './word-comb-condition.component.html',
  styleUrls: ['./word-comb-condition.component.scss']
})
export class WordCombConditionComponent implements OnInit {
  or: string = "or";
  and: string = "and";
  phrase: string = "phrase";
  formGroup: FormGroup;
  options: any = [{value: 'or', name: WordMatchCombEnum.AnyWord}, {value: 'and', name: WordMatchCombEnum.AllWords}, {value: 'phrase', name: WordMatchCombEnum.Phrase}]
  constructor(public fb: FormBuilder) { 
    this.formGroup = this.fb.group({
      optionControl: ['or', [ Validators.required ] ],
    });
  }

  ngOnInit(): void {
  }

  change(e) {
    this.formGroup.controls.optionControl.setValue(e.target.value, {
      onlySelf: true
    });
  }

}
