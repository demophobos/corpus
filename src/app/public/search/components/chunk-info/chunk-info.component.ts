import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChunkElementView } from '@shared/models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-chunk-info',
  templateUrl: './chunk-info.component.html',
  styleUrls: ['./chunk-info.component.scss']
})
export class ChunkInfoComponent implements OnInit {
  @Input() chunk: ChunkElementView;
  constructor(private searchService: SearchService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }
  getInfo(chunk: ChunkElementView) {
    this.searchService.getIndex(chunk.indexId).then((result) => {
      this.snackBar.open(`${result.headerDesc}`, 'Текст');
    });
  }
}
