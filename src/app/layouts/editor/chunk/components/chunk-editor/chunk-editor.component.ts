import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@shared/components';
import { Chunk } from '@shared/models';

@Component({
  selector: 'app-chunk-editor',
  templateUrl: './chunk-editor.component.html',
  styleUrls: ['./chunk-editor.component.scss']
})
export class ChunkEditorComponent extends BaseComponent implements OnInit {
  public data: Chunk;
  public editorForm = new FormGroup({
    valueFormControl: new FormControl('', Validators.required)
  });
  constructor(private dialogRef: MatDialogRef<ChunkEditorComponent>) {
    super();
  }

  ngOnInit(): void {
    this.editorForm.controls.valueFormControl.setValue(this.data.value);
  }
  public save() {
    this.data.value = this.editorForm.controls.valueFormControl.value;
    this.dialogRef.close(this.data);
  }

  public close() {
    this.dialogRef.close();
  }
}
