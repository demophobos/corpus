import { Injectable, OnInit } from '@angular/core';
import { ApiService, AuthService } from '@core/services';
import { AppConfig } from '@shared/constants';
import { Project, User } from '@shared/models';
import { DialogService } from '@shared/services';
import { ReplaySubject } from 'rxjs';
import { ProjectEditorComponent } from '../components/project-editor/project-editor.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements OnInit {
  user: User;
  private projectData = new ReplaySubject<Project[]>(1);
  projects$: ReplaySubject<Project[]> = this.projectData;
  private selectedProjectData = new ReplaySubject<Project>();
  selectedProject$: ReplaySubject<Project> = this.selectedProjectData;

  constructor(
    private readonly projectApiService: ApiService<Project>,
    private readonly authService: AuthService,
    private readonly dialogService: DialogService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.getProjects();
    });
  }

  ngOnInit(): void {}

  async showEditorDialog(project: Project): Promise<Project> {
    return this.dialogService
      .showComponent(
        ProjectEditorComponent,
        project,
        AppConfig.DefaultDialogWidth
      )
      .toPromise()
      .then((project: Project) => {
        if (project) {
          return project;
        }
      });
  }

  async createProject(project: Project): Promise<Project> {
    project.creatorId = this.user.id;
    project.created = new Date();
    return await this.projectApiService
      .save(project)
      .toPromise()
      .then((project: Project) => {
        return project;
      });
  }

  async updateProject(project: Project): Promise<Project> {
    project.modifierId = this.user.id;
    project.modified = new Date();
    return await this.projectApiService
      .save(project)
      .toPromise()
      .then((project: Project) => {
        return project;
      });
  }

  async deleteProject(project: Project): Promise<Project> {
    return await this.dialogService
      .confirm(project.name, 'Are you sure?')
      .toPromise()
      .then((confirmed) => {
        if (confirmed) {
          return this.projectApiService
            .remove(project)
            .toPromise()
            .then((project: Project) => {
              return project;
            });
        }
      });
  }

  async getProjects(): Promise<Project[]> {
    return await this.projectApiService
      .findByQuery(new Project({}), JSON.stringify({ creatorId: this.user.id }))
      .toPromise()
      .then((res : Project[]) => {
        return res;
      });
  }
}
