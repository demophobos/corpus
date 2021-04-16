import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { IndexView } from '@shared/models';
import { Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-index-selector',
  templateUrl: './index-selector.component.html',
  styleUrls: ['./index-selector.component.scss'],
})
export class IndexSelectorComponent extends BaseComponent implements OnInit {
  indeces: IndexView[];
  editorForm: FormGroup;
  filteredIndeces: Observable<IndexView[]>;
  constructor(private indexService: IndexService, private formBuilder: FormBuilder) {
    super();
    this.editorForm = this.formBuilder.group({
      indexSelectorControl: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.indexService.selectedHeader.subscribe((header) => {
      this.indexService.getIndeces(header.id).then((indeces) => {
        this.indeces = indeces;
        if(this.indeces.length > 0){
          this.editorForm.controls.indexSelectorControl.enable();
        }
        this.filteredIndeces = this.editorForm.controls.indexSelectorControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
    });
  }

  private _filter(name: string): IndexView[] {
    if(this.indeces){
      const filterValue = name.toLowerCase();
      return this.indeces.filter(
        (option) => option.name.indexOf(filterValue) === 0
      );
    }
  }
  indexChanged(event) {
    var test = event.option.value;
  }
}
