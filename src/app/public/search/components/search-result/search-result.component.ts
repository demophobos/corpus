import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkElementView, ElementView } from '@shared/models';
import { SearchService } from '../../services/search.service';
import { from } from 'rxjs';
import { mergeMap, groupBy, toArray } from 'rxjs/operators';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent extends BaseComponent implements OnInit {
  chunks: ChunkElementView[];
  groupped: Map<string, ElementView[]>;
  isLoading: boolean = false;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.chunks.subscribe((chunks) => {
      this.chunks = chunks;
    });

    this.searchService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
