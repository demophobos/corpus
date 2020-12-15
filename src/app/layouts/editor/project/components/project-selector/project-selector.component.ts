import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { BaseComponent } from '@shared/components';
import { EventEnum } from '@shared/enums';
import { Project } from '@shared/models';
import { UrlEnum } from 'app/layouts/editor/editor-page/services/url.enum';
import { EditorEventService } from 'app/layouts/editor/editor.event.service';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss'],
})
export class ProjectSelectorComponent extends BaseComponent implements OnInit {
  projects: Project[];
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ProjectSelectorComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private eventService: EditorEventService
  ) {
    super();
    this.eventService.do(EventEnum.PROJECTS_LOAD);
  }

  ngOnInit(): void {
    this.eventService.PROJECT_UPDATED.subscribe((project: Project) => {
      let item = this.projects.find(i => i.id == project.id);
      item = project;
      this.changeDetectorRef.markForCheck();
    });
    this.eventService.PROJECT_DELETED.subscribe((project: Project) => {
      this.projects = this.projects.filter(i=>i.id !== project.id);
      this.changeDetectorRef.markForCheck();
    });
    this.eventService.PROJECTS_LOADED.subscribe((projects: Project[]) => {
      this.projects = projects;
      this.changeDetectorRef.markForCheck();
    });
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  open(project: Project) {
    this.eventService.do(EventEnum.PROJECT_SELECT, project);
    this.router.navigateByUrl(UrlEnum.Project);
    this.close();
  }
  delete(project: Project) {
    this.eventService.do(EventEnum.PROJECT_DELETE, project);
  }
  edit(project: Project) {
    this.eventService.do(EventEnum.PROJECT_UPDATE, project);
  }
}
