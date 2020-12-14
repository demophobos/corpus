import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@shared/components';
import { Project } from '@shared/models';
import { ActionEnum } from 'app/layouts/editor/editor/services/action.enum';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent extends BaseComponent implements OnInit {
  public data: Project;

  public editorForm = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    descriptionFormControl: new FormControl('', Validators.required)
  });
  constructor(private dialogRef: MatDialogRef<ProjectEditorComponent>,
    private projectService: ProjectService) {
    super();
  }

  ngOnInit(): void {
    this.editorForm.controls.nameFormControl.setValue(this.data.name);
    this.editorForm.controls.descriptionFormControl.setValue(this.data.desc);
  }
  public save() {
    this.data.name = this.editorForm.controls.nameFormControl.value;
    this.data.desc = this.editorForm.controls.descriptionFormControl.value;
    this.projectService.saveProject(this.data);
    this.dialogRef.close();
  }

  public close() {
    this.dialogRef.close(this.data);
  }
}
