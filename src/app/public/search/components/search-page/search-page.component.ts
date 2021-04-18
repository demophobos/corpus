import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkQuery } from '@shared/models';
import { DialogService } from '@shared/services';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent extends BaseComponent implements OnInit {
  query: ChunkQuery;
  isLoading: boolean;
  dialog: any;
  constructor(private searchService: SearchService, private dialogService: DialogService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
        this.query = query;
    });
    this.searchService.isLoading.pipe(takeUntil(this.destroyed)).subscribe(isLoading=>{
      this.isLoading = isLoading;
      if(isLoading == true){
        this.dialog = this.dialogService.showSpinner();
      }
      if(this.dialog && isLoading == false){
        this.dialog.close();
      }
    });
  }
}
