import { Injectable, Injector } from '@angular/core';
import { ApiService } from '@core/services';
import { ElementView, IndexView } from '@shared/models';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public currentSearch: ReplaySubject<string> = new ReplaySubject<string>(1);
  public elements: ReplaySubject<ElementView[]> = new ReplaySubject<
    ElementView[]
  >(1);
  public isLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  constructor(
    private elementService: ApiService<ElementView>,
    private indexService: ApiService<IndexView>
  ) {}

  public getElementsByExactForm(value: string) {
    this.elements.next(new Array<ElementView>());
    this.currentSearch.next(value);
    this.isLoading.next(true);
    this.elementService
      .findByQuery(new ElementView({}), JSON.stringify({ value: value }))
      .toPromise()
      .then((value) => {
        this.elements.next(value);
        this.isLoading.next(false);
      });
  }

  public getIndex(id: string): Promise<IndexView> {
    return this.indexService
      .findByQuery(new IndexView({}), JSON.stringify({ _id: id }))
      .toPromise()
      .then((result: IndexView[]) => {
        return Promise.resolve(result[0]);
      });
  }
}
