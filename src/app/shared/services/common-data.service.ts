import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { ProjectGroup } from '@shared/interfaces';
import {
  HeaderModel,
  HeaderView,
  ProjectModel,
  TaxonomyQuery,
  TaxonomyViewModel,
} from '@shared/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {
  public taxonomyItems = new BehaviorSubject<TaxonomyViewModel[]>([]);
  public headers = new BehaviorSubject<HeaderView[]>([]);
  public projects = new BehaviorSubject<ProjectModel[]>([]);
  constructor(
    private headerService: ApiService<HeaderModel>,
    private taxonomyService: ApiService<TaxonomyViewModel>
  ) {}

  public async getTaxonomyItems(): Promise<TaxonomyViewModel[]> {
    if (this.taxonomyItems.value.length == 0) {
      return await this.loadTaxonomyItems().then(() => {
        return this.taxonomyItems.value;
      });
    }
    return this.taxonomyItems.value;
  }
  
  public getHeadersGrouppedByProject(): Promise<ProjectGroup[]> {
    return this.getHeaders().then(() => {
      var projectGroups: ProjectGroup[] = [];
      var groups = this.getProjectGroups();
      groups.forEach((project) => {
        projectGroups.push({
          code: project.code,
          headers: this.getHeadersByProject(project.id)
        });
      });
      return projectGroups;
    });
  }

  public async getHeaders(): Promise<HeaderView[]> {
    if (this.headers.value.length == 0) {
      return await this.loadHeaders().then(() => {
        return this.headers.value;
      });
    }
    return this.headers.value;
  }

  public getProjectGroups() {
    return this.projects.value.sort((a, b) => this.sortAsc(a.code, b.code));
  }

  public getHeadersByProject(projectId: string): HeaderView[] {
    return this.headers.value.filter((i) => i.projectId == projectId);
  }

  public getHeadersByFirstLetter(letter: string): HeaderView[] {
    return this.headers.value.filter((i) => i.code.startsWith(letter));
  }

  public getHeaderLetterGroupsByLang(langCode: string): string[] {
    return this.getHeadersByLang(langCode)
      .map((i) => i.code[0])
      .filter(this.onlyUnique)
      .sort(this.sortAsc);
  }

  public getHeadersByLang(langCode: string): HeaderView[] {
    var filtered = this.headers.value.filter((i) => i.lang == langCode);
    return filtered;
  }

  private async loadHeaders() {
    await this.headerService
      .findByQuery(new HeaderView({}), JSON.stringify({}))
      .toPromise()
      .then((headers: HeaderView[]) => {
        this.headers.next(headers);
        this.projects.next(
          headers
            .filter(
              (thing, i, arr) =>
                arr.findIndex((t) => t.projectId == thing.projectId) === i
            )
            .map(
              (i) =>
                new ProjectModel({
                  code: i.projectCode,
                  desc: i.projectDesc,
                  id: i.projectId,
                })
            )
        );
        Promise.resolve();
      });
  }

  private async loadTaxonomyItems() {
    await this.taxonomyService
      .findByQuery(
        new TaxonomyViewModel({}),
        JSON.stringify(new TaxonomyQuery({}))
      )
      .toPromise()
      .then((items: TaxonomyViewModel[]) => {
        this.taxonomyItems.next(items);
        Promise.resolve();
      });
  }

  private onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }

  private sortAsc(a: string, b: string) {
    return a < b ? -1 : 1;
  }
}
