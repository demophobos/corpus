import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormSearchType } from '@shared/enums';
import { ElementQuery } from '@shared/models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.scss'],
})
export class SearchOptionsComponent implements OnInit {
  panelOpenState = true;
  optionsForm: FormGroup;
  data: ElementQuery;
  constructor(
    private dialogRef: MatDialogRef<SearchOptionsComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.optionsForm = this.fb.group({
      options: [this.data.formSearchType],
    });

    this.onChanges();
  }

  onChanges(): void {
    this.optionsForm.valueChanges.subscribe((val) => {
      if (val.options) {
        this.data.formSearchType = val.options;
      } else {
        this.data.formSearchType = FormSearchType.Free
      }
    });
  }

  save() {
    this.dialogRef.close(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
