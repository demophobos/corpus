import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import {
  ChunkView,
  HeaderView,
  IndexModel,
  PageResponse,
} from '@shared/models';
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
  public selectedChunk = new BehaviorSubject<ChunkView>(undefined);

  constructor(
    private indexApiService: ApiService<IndexModel>,
    private chunkApiService: ApiService<ChunkView>
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

  public async getChunk(index: IndexModel): Promise<ChunkView> {
    return await this.chunkApiService
      .findPageByQuery(new ChunkView({}), JSON.stringify({ indexId: index.id }))
      .toPromise()
      .then((result: PageResponse) => {
        this.selectedChunk.next(result.documents[0]);
        return Promise.resolve(result.documents[0]);
      });
  }
}
