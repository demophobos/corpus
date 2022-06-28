import { AfterViewInit, Component } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { SearchService } from '../../../services/search.service';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { ChunkView } from '@shared/models';
@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent
  extends BaseComponent
  implements AfterViewInit
{
  displayedColumns: string[] = ['chunk'];

  chunks: MatTableDataSource<ChunkView> = new MatTableDataSource([]);

  isLoading: boolean = false;

  showInterp: boolean = false;

  constructor(private searchService: SearchService) {
    super();
  }

  ngAfterViewInit() {
    this.searchService.showHideVersion
      .pipe(takeUntil(this.destroyed))
      .subscribe((value) => {
        this.showInterp = value;
      });
      
    this.searchService.elementedChunks
      .pipe(takeUntil(this.destroyed))
      .subscribe((chunks) => {
        this.chunks = new MatTableDataSource(chunks);
      });

    this.searchService.isLoading
      .pipe(takeUntil(this.destroyed))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }
}
