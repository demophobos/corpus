import { Component, destroyPlatform, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { FormSearchType } from '@shared/enums';
import { ChunkQuery, ElementView } from '@shared/models';
import { DialogService } from '@shared/services';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends BaseComponent implements OnInit {

  searchRulePaneSize = 20;
  searchResultPaneSize = 80;
  commentPaneSize = 0;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.showComment.pipe(takeUntil(this.destroyed)).subscribe(showComment=>{
      this.commentPaneSize = showComment ? 20 : 0;
      this.searchResultPaneSize = showComment ? 60 : 80;
    })
  }
}
