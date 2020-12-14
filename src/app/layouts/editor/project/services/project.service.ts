import { Injectable, OnInit } from '@angular/core';
import { ApiService, AuthService, SnackBarService } from '@core/services';
import { ActionEnum } from '@shared/enums';
import { Project, User } from '@shared/models';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements OnInit {
  user$: User;
  private projectData = new ReplaySubject<Project[]>(1);
  projects$: ReplaySubject<Project[]> = this.projectData;
  private selectedProjectData = new ReplaySubject<Project>();
  selectedProject$: ReplaySubject<Project> = this.selectedProjectData;

  constructor(
    private readonly projectApiService: ApiService<Project>,
    private readonly authService: AuthService,
    private readonly snackBarService: SnackBarService
  ) {
    this.authService.user$.subscribe((user) => {
      this.user$ = user;
      this.getProjects();
    });
  }

  ngOnInit(): void {}

  public saveProject(project: Project) {

    if (project.id) {
      project.modifierId = this.user$.id;
      project.modified = new Date();
    } else {
      project.creatorId = this.user$.id;
      project.created = new Date();
    }

    this.projectApiService
      .save(project)
      .toPromise()
      .then(() => {
        this.getProjects();
      });
  }

  public deleteProject(project: Project) {
    this.projectApiService
      .remove(project)
      .toPromise()
      .then(() => {
        this.getProjects();
      })
      .then(() => {
        this.snackBarService.open(`${project.name}`, ActionEnum.ProjectDeleted);
        Promise.resolve();
      });
  }

  public getProjects(): any {
    this.projectApiService
      .findByQuery(new Project({}), JSON.stringify({ creatorId: this.user$.id }))
      .toPromise()
      .then((res) => {
        this.projectData.next(res);
      });
  }

  selectProject(project: Project) {
    this.selectedProjectData.next(project);
  }
}
