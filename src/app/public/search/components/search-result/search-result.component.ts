import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ElementView } from '@shared/models';
import { SearchService } from '../../services/search.service';
import { from } from 'rxjs';
import { mergeMap, groupBy, toArray } from 'rxjs/operators';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent extends BaseComponent implements OnInit {
  chunks: string[];
  groupped: Map<string, ElementView[]>;
  isLoading: boolean = false;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.elements.subscribe((elements) => {

      this.chunks = new Array<string>();

      this.groupped = new Map<string, ElementView[]>();

      const source = from(elements);

      const groupped = source.pipe(
        groupBy((person) => person.chunkId),

        mergeMap((group) => group.pipe(toArray()))
      );

      groupped.subscribe((val) => {
        this.chunks.push(val[0].chunkId);
        this.groupped.set(val[0].chunkId, val);
      });
    });

    this.searchService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    
  }
  
  getElements(chunkId: string): ElementView[] {
    return this.groupped.get(chunkId);
  }
}