import { Injectable, Injector } from '@angular/core';
import { ApiService } from '@core/services';
import { ChunkElementView, ElementQuery, ElementView, IndexView } from '@shared/models';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public currentQuery: ReplaySubject<ElementQuery> = new ReplaySubject<ElementQuery>(1);
  public chunks: ReplaySubject<ChunkElementView[]> = new ReplaySubject<
  ChunkElementView[]
  >(1);
  public isLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  constructor(
    private elementService: ApiService<ElementView>,
    private indexService: ApiService<IndexView>
  ) {}

  public getElementsByValue(query: ElementQuery) {
    this.chunks.next(new Array<ChunkElementView>());
    this.currentQuery.next(query);
    this.isLoading.next(true);
    this.elementService
      .findByQuery(new ElementView({}), JSON.stringify(query))
      .toPromise()
      .then((value) => {
        this.chunks.next(value);
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
