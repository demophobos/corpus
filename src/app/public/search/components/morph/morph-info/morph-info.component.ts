import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@shared/components';
import { ChunkValueItemModel, ElementView } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-morph-info',
  templateUrl: './morph-info.component.html',
  styleUrls: ['./morph-info.component.scss']
})
export class MorphInfoComponent extends BaseComponent implements OnInit {

  @Input() morphInfo: ChunkValueItemModel;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.commentable.pipe(takeUntil(this.destroyed)).subscribe((item: ChunkValueItemModel) => {
      if (item) {
        this.morphInfo = item;
      }
    });
  }

}
