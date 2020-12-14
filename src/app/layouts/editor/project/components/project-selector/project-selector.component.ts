import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { Project } from '@shared/models';
import { DialogService } from '@shared/services';
import { UrlEnum } from 'app/layouts/editor/editor/services/url.enum';
import { ProjectService } from '../../services/project.service';
import { ProjectEditorComponent } from '../project-editor/project-editor.component';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent extends BaseComponent implements OnInit {
  projects: Project[];
  constructor(private projectService: ProjectService,
    private dialogService: DialogService,
    private bottomSheetRef: MatBottomSheetRef<ProjectSelectorComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
    ) {
    super();
  }

  ngOnInit(): void {
    this.projectService.projects$.subscribe(projects => {
      this.projects = projects;
      this.changeDetectorRef.markForCheck();
    });
  }
  
  close() {
    this.bottomSheetRef.dismiss();
  }

  open(project: Project) {
    this.router.navigateByUrl(UrlEnum.Project);
    this.projectService.selectProject(project);
    this.close();
  }
  delete(project: Project) {
    this.dialogService.confirm(project.name, 'Are you sure?')
      .toPromise().then(confirmed => {
        if (confirmed) {
          this.projectService.deleteProject(project);
        }
      });
  }
  edit(project: Project) {
    this.dialogService.showComponent(ProjectEditorComponent, project, AppConfig.DefaultDialogWidth);
  }
}
