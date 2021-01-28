import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkElementView, ChunkQuery } from '@shared/models';
import { SearchService } from '../../services/search.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Language } from '@shared/enums';
import { takeUntil } from 'rxjs/operators';
import { AppConfig } from '@shared/constants';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent extends BaseComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  query: ChunkQuery;

  index: number;

  total: number;

  limit: number;

  displayedColumns: string[] = ['select', 'chunk'];

  chunks: MatTableDataSource<ChunkElementView>;

  isLoading: boolean = false;

  pageEvent: PageEvent;

  selection = new SelectionModel<ChunkElementView>(true, []);
  
  constructor(private searchService: SearchService) {
    super();
  }

  showHideCommentPane(){
    this.searchService.switchCommentPane = true;
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

    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe((query) => {
        
        this.query = query;

        if(query){

          this.limit = query.limit;

          this.total = query.total;
  
          this.index = query.index;
        }

      });

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

  showPaginator(): boolean{
    return !this.isLoading && this.chunks !== undefined && this.chunks.data.length > 0;
  }

  loadPage(page: PageEvent): any {
    this.query.index = page.pageIndex;
    this.query.skip = page.pageIndex * AppConfig.DefaultPageLimit;
    this.searchService.getChunks(this.query);
  }
}
