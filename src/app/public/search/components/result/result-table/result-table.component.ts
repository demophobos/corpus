import { AfterViewInit, Component } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkElementView } from '@shared/models';
import { SearchService } from '../../../services/search.service';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent extends BaseComponent implements AfterViewInit {

  displayedColumns: string[] = ['chunk'];

  chunks: MatTableDataSource<ChunkElementView> = new MatTableDataSource([]);

  isLoading: boolean = false;

  constructor(private searchService: SearchService) {
    super();
  }

  ngAfterViewInit() {
    this.searchService.elementedChunks.pipe(takeUntil(this.destroyed)).subscribe((chunks) => {
        this.chunks = new MatTableDataSource(chunks);
      });

    this.searchService.isLoading.pipe(takeUntil(this.destroyed)).subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }
}
