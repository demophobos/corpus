import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseComponent } from '@shared/components';
import { ChunkView } from '@shared/models';
import { HomeService } from '../../services/home.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-top-chunks-widget',
  templateUrl: './top-chunks-widget.component.html',
  styleUrls: ['./top-chunks-widget.component.scss']
})
export class TopChunksWidgetComponent extends BaseComponent implements AfterContentInit {
  displayedColumns: string[] = ['chunk'];

  chunks: MatTableDataSource<ChunkView> = new MatTableDataSource([]);

  isLoading: boolean = false;
  constructor(private homeService: HomeService) { 
    super();
  }

  ngAfterContentInit(): void {
    this.homeService.elementedChunks.pipe(takeUntil(this.destroyed)).subscribe((chunks) => {
      this.chunks = new MatTableDataSource(chunks);
    });

  this.homeService.isLoading.pipe(takeUntil(this.destroyed)).subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

}
