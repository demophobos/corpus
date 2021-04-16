import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { HeaderView, IndexView } from '@shared/models';
import { CommonDataService } from '@shared/services/common-data.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

export interface WorkGroup {
  letter: string;
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

  public getWorkGroups(langCode: string): Promise<WorkGroup[]> {
    return this.commonDataService.getHeaders().then(() => {
      var workGroups: WorkGroup[] = [];
      var groups = this.commonDataService.getHeaderLetterGroupsByLang(langCode);
      groups.forEach((letter) => {
        workGroups.push({
          letter: letter,
          headers: this.commonDataService.getHeadersByFirstLetter(letter),
        });
      });
      return workGroups;
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
