import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { AppConfig } from '@shared/constants';
import { ChunkQuery, ChunkView, PageResponse } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public elementedChunks: ReplaySubject<ChunkView[]> = new ReplaySubject<
    ChunkView[]
  >(1);
  public isLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private chunkService: ApiService<ChunkView>) {}

  public async getTopUpdatedChunks() {

    this.isLoading.next(true);

    await this.chunkService
      .findPageByQuery(
        new ChunkView({}),
        JSON.stringify({
          total: AppConfig.DefaultPageLimit,
          topUpdated: true
        })
      )
      .toPromise()
      .then((page: PageResponse) => {
        this.elementedChunks.next(page.documents);
        this.isLoading.next(false);
      });
  }
}
