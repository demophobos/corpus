import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { Project } from '@shared/models';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent extends BaseComponent implements OnInit {
  project: Project;
  selectorAreaSize: Number = 20;
  textAreaSize: Number = 80;
  gutterSize: Number = 11;
  useTransition: Boolean = true;
  constructor(private projectService: ProjectService) {
    super();
  }

  ngOnInit(): void {
    this.projectService.selectedProject$.subscribe(project => {
      this.project = project;
    })
  }

  areaDividerClick() {
    if (this.selectorAreaSize > 0) {
      this.selectorAreaSize = 0;
      this.textAreaSize = 100;
    } else {
      this.selectorAreaSize = 20;
      this.textAreaSize = 80;
    }
  }
}
