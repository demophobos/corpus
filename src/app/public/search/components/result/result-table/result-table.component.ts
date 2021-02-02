import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkElementView, ChunkQuery } from '@shared/models';
import { SearchService } from '../../../services/search.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Language } from '@shared/enums';
import { takeUntil } from 'rxjs/operators';
import { AppConfig } from '@shared/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent extends BaseComponent implements AfterViewInit {

  displayedColumns: string[] = ['select', 'chunk'];

  chunks: MatTableDataSource<ChunkElementView> = new MatTableDataSource([]);

  isLoading: boolean = false;

  selection = new SelectionModel<ChunkElementView>(true, []);

  constructor(private searchService: SearchService) {
    super();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.chunks.data.length;
    return numSelected === numRows;
  }


  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.chunks.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ChunkElementView): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  ngAfterViewInit() {

    this.searchService.elementedChunks.pipe(takeUntil(this.destroyed)).subscribe((chunks) => {
        this.chunks = new MatTableDataSource(chunks);
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
}
