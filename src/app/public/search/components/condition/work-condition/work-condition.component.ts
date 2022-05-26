import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BaseComponent } from '@shared/components';
import { ProjectGroup } from '@shared/interfaces';
import { ChunkQuery, HeaderView, ProjectModel } from '@shared/models';
import { CommonDataService } from '@shared/services/common-data.service';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-work-condition',
  templateUrl: './work-condition.component.html',
  styleUrls: ['./work-condition.component.scss'],
})
export class WorkConditionComponent extends BaseComponent implements OnInit {
  headerSelector = new FormControl();
  projects: ProjectModel[];
  headers: HeaderView[];
  query: ChunkQuery;
  projectGroups: ProjectGroup[] = [];
  constructor(private searchService: SearchService, private commonDataService: CommonDataService, private bottomSheet: MatBottomSheet) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.commonDataService.getHeadersGrouppedByProject().then((items) => {
      this.projectGroups = items;
    });

    this.searchService.chunkQuery
      .pipe(takeUntil(this.destroyed))
      .subscribe((query) => {
        this.query = query;
        if (this.query && this.query.headers) {
          this.headerSelector.setValue(this.query.headers);
        }
      });

    this.headerSelector.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((values: string[]) => {
        if (this.query) {
          this.query.headers = values;
          this.searchService.setSelectedWorksCount(this.query);
        }
      });
  }

  getProjectHeaders(projectId: string) {
    return this.headers.filter((i) => i.projectId == projectId);
  }

  closeOpera(){
    this.bottomSheet.dismiss();
  }
}
