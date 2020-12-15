import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@shared/components';
import { Index, IndexTreeNode } from '@shared/models';

@Component({
  selector: 'app-index-editor',
  templateUrl: './index-editor.component.html',
  styleUrls: ['./index-editor.component.scss'],
})
export class IndexEditorComponent extends BaseComponent implements OnInit {
  public data: { parent: IndexTreeNode; index: Index };
  private existingNodes: IndexTreeNode[];
  public editorForm = new FormGroup({
    prefixFormControl: new FormControl(''),
    nameFormControl: new FormControl('', Validators.required),
    orderFormControl: new FormControl('', Validators.required),
  });
  constructor(private dialogRef: MatDialogRef<IndexEditorComponent>) {
    super();
  }

  ngOnInit(): void {
    if (this.data.parent) {
      this.existingNodes = this.data.parent.children;
      this.editorForm.controls.prefixFormControl.setValue(
        this.data.parent.name
      );
    }
    const count = this.existingNodes ? this.existingNodes.length + 1 : 1;
    this.editorForm.controls.orderFormControl.setValue(count);
    if (this.data.index.id) {
      this.editorForm.controls.nameFormControl.setValue(this.data.index.name);
    } else {
      this.editorForm.controls.nameFormControl.setValue(count);
    }
  }
  public save() {
    //TODO: index naming tamplate
    if (this.data.parent) {
      this.data.index.name = `${this.data.parent.name}.${this.editorForm.controls.nameFormControl.value}`;
    } else {
      this.data.index.name = this.editorForm.controls.nameFormControl.value;
    }
    this.data.index.order = this.editorForm.controls.orderFormControl.value;
    this.dialogRef.close(this.data);
  }

  public close() {
    this.dialogRef.close();
  }
}
