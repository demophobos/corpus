import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { HeaderView, IndexView } from '@shared/models';
import { CommonDataService } from '@shared/services/common-data.service';
import { ReplaySubject } from 'rxjs';

export interface ProjectGroup {
  code: string;
  headers: HeaderView[];
}

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  public selectedLang: ReplaySubject<string> = new ReplaySubject<string>(1);
  public selectedHeader: ReplaySubject<HeaderView> = new ReplaySubject<HeaderView>(1);
  constructor(
    private commonDataService: CommonDataService,
    private indexApiService: ApiService<IndexView>
  ) {}

  public getWorkGroups(): Promise<ProjectGroup[]> {
    return this.commonDataService.getHeaders().then(() => {
      var projectGroups: ProjectGroup[] = [];
      var groups = this.commonDataService.projects.value;
      groups.forEach((project) => {
        projectGroups.push({
          code: project.code,
          headers: this.commonDataService.getHeadersByProject(project.id)
        });
      });
      return projectGroups;
    });
  }

  public async getIndeces(headerId: string): Promise<IndexView[]> {
    return await this.indexApiService
      .findByQuery(new IndexView({}), JSON.stringify({ headerId: headerId }))
      .toPromise()
      .then((result) => {
        return Promise.resolve(result);
      });
  }
}
