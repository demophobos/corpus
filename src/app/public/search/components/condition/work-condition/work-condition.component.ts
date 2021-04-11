import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { ChunkQuery, HeaderView, ProjectModel } from '@shared/models';
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

  constructor(private searchService: SearchService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.searchService.headers
      .pipe(takeUntil(this.destroyed))
      .subscribe((headers) => {
        this.headers = headers;
        this.projects = headers
          .filter(
            (thing, i, arr) =>
              arr.findIndex((t) => t.projectId == thing.projectId) === i
          )
          .map(
            (i) =>
              new ProjectModel({
                code: i.projectCode,
                desc: i.projectDesc,
                id: i.projectId,
              })
          );
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
}
