import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkElementView } from '@shared/models';
import { SearchService } from '../../services/search.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Language } from '@shared/enums';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent
  extends BaseComponent
  implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  total: number;
  queryConditionInfo: string;
  displayedColumns: string[] = ['chunk'];
  resultsLength = 0;
  isRateLimitReached = false;
  chunks: ChunkElementView[];
  isLoading: boolean = false;
  constructor(private searchService: SearchService) {
    super();
  }

  ngAfterViewInit() {
    this.searchService.currentQuery.pipe(takeUntil(this.destroyed)).subscribe((query) => {
        this.queryConditionInfo = JSON.stringify(query);
      });
    this.searchService.chunks.pipe(takeUntil(this.destroyed)).subscribe((chunks) => {
        this.chunks = chunks;
        this.total = chunks.length;
      });

    this.searchService.isLoading.pipe(takeUntil(this.destroyed)).subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  getInterpIcon(chunk: ChunkElementView): string {
    return chunk.headerLang == Language.Latin
      ? Language.Russian
      : Language.Latin;
  }

  showPaginator(): boolean{
    return !this.isLoading && this.chunks.length > 0;
  }
}
