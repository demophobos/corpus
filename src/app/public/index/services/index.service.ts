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
  public selectedIndex: ReplaySubject<IndexView> = new ReplaySubject<IndexView>(1);
  constructor(
    private indexApiService: ApiService<IndexView>
  ) {}

  public async getIndeces(headerId: string): Promise<IndexView[]> {
    return await this.indexApiService
      .findByQuery(new IndexView({}), JSON.stringify({ headerId: headerId }))
      .toPromise()
      .then((result) => {
        return Promise.resolve(result);
      });
  }
}
