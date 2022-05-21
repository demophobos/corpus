import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { IndexModel, IndexView } from '@shared/models';
import { Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { IndexService } from '../../services/index.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-index-selector',
  templateUrl: './index-selector.component.html',
  styleUrls: ['./index-selector.component.scss'],
})
export class IndexSelectorComponent extends BaseComponent implements OnInit {
  indeces: IndexModel[];
  editorForm: FormGroup;
  filteredIndeces: Observable<IndexModel[]>;
  constructor(private indexService: IndexService, private formBuilder: FormBuilder, private bottomSheet: MatBottomSheet) {
    super();
    this.editorForm = this.formBuilder.group({
      indexSelectorControl: [{value: '', disabled: true } ]
    });
  }

  ngOnInit(): void {
    this.indexService.selectedHeader.pipe(takeUntil(this.destroyed)).subscribe((header) => {
      this.editorForm.controls.indexSelectorControl.setValue('');
      this.editorForm.controls.indexSelectorControl.disable();
      if(header){
        if(history.state.indexName){
          this.indexService.getIndeces(header.id).then((indeces) => {
            this.indeces = indeces;
            this.indexService.selectedIndeces.next(indeces);
            if(this.indeces && this.indeces.length > 0){
              this.editorForm.controls.indexSelectorControl.setValue(history.state.indexName);
              this.editorForm.controls.indexSelectorControl.enable();
              this.indexChanged(history.state.indexName);
            }
          });
        }else{
          if(this.indexService.selectedIndeces.value){
            this.indeces = this.indexService.selectedIndeces.value;
            if(this.indeces && this.indeces.length > 0){
              if(this.indexService.selectedIndex.value){
                this.editorForm.controls.indexSelectorControl.setValue(this.indexService.selectedIndex.value.name);
              }
              this.editorForm.controls.indexSelectorControl.enable();
            }
          }else{
            this.indexService.getIndeces(header.id).then((indeces) => {
              this.indeces = indeces;
              this.indexService.selectedIndeces.next(indeces);
              if(this.indeces && this.indeces.length > 0){
                this.editorForm.controls.indexSelectorControl.enable();
              }
            });
          }
        }
      }
      this.filteredIndeces = this.editorForm.controls.indexSelectorControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }

  private _filter(name: string): IndexModel[] {
    if(this.indeces){
      const filterValue = name.toLowerCase();
      return this.indeces.filter(
        (option) => option.name.indexOf(filterValue) === 0
      );
    }
  }
  indexChanged(name: string) {
    let selectedIndex = this.indeces.find(i=>i.name == name);
    if(selectedIndex){
      this.indexService.selectedIndex.next(selectedIndex);
    }
  }
}
