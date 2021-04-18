import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { HeaderView, IndexModel } from '@shared/models';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

export interface ProjectGroup {
  code: string;
  headers: HeaderView[];
}

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  public selectedHeader = new BehaviorSubject<HeaderView>(undefined);
  public selectedIndeces = new BehaviorSubject<IndexModel[]>(undefined);
  public selectedIndex = new BehaviorSubject<IndexModel>(undefined);
  constructor(
    private indexApiService: ApiService<IndexModel>
  ) {}

  public async getIndeces(headerId: string): Promise<IndexModel[]> {
    return await this.indexApiService
      .findByQuery(new IndexModel({}), JSON.stringify({ headerId: headerId }))
      .toPromise()
      .then((result) => {
        this.selectedIndeces.next(result);
        return Promise.resolve(result);
      });
  }
}
