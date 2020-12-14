import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@shared/components';
import { EditionType, Language } from '@shared/enums';
import { Header } from '@shared/models';
import { KeysPipe } from '@shared/pipes';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-header-editor',
  templateUrl: './header-editor.component.html',
  styleUrls: ['./header-editor.component.scss']
})
export class HeaderEditorComponent extends BaseComponent implements OnInit {
  public data: Header;
  public editionTypes: any;
  public langs: any;
  public editorForm = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    descriptionFormControl: new FormControl('', Validators.required),
    langFormControl: new FormControl('',  Validators.required),
    typeFormControl: new FormControl('', Validators.required)
  });
  constructor(private dialogRef: MatDialogRef<HeaderEditorComponent>,
    private documentService: DocumentService) {
    super();
  }

  ngOnInit(): void {
    this.langs = Language;
    this.editionTypes = EditionType;
    this.editorForm.controls.nameFormControl.setValue(this.data.name);
    this.editorForm.controls.descriptionFormControl.setValue(this.data.desc);
    this.editorForm.controls.langFormControl.setValue(this.data.lang);
    this.editorForm.controls.typeFormControl.setValue(this.data.editionType);
  }
  public save() {
    this.data.name = this.editorForm.controls.nameFormControl.value;
    this.data.desc = this.editorForm.controls.descriptionFormControl.value;
    this.data.lang = this.editorForm.controls.langFormControl.value;
    this.data.editionType = this.editorForm.controls.typeFormControl.value;

    this.documentService.saveHeader(this.data);
    this.dialogRef.close(this.data);
  }

  public close() {
    this.dialogRef.close();
  }

}
