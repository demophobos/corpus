import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { HeaderView, ProjectModel } from '@shared/models';
import { CommonDataService } from '@shared/services/common-data.service';
import { IndexService, ProjectGroup } from '../../services/index.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IndexTreeComponent } from '../index-tree/index-tree.component';
import { MatPaginator } from '@angular/material/paginator';
import { WorkConditionComponent } from 'app/public/search/components/condition/work-condition/work-condition.component';
import { takeUntil } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
export const _filter = (headers: HeaderView[], value: string): HeaderView[] => {
  const filterValue = value.toLowerCase();

  return headers.filter(
    (item) => item.code.toLowerCase().indexOf(filterValue) === 0
  );
};

@Component({
  selector: 'app-work-selector',
  templateUrl: './work-selector.component.html',
  styleUrls: ['./work-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkSelectorComponent extends BaseComponent implements OnInit {
  headerSelector = new UntypedFormControl();
  projects: ProjectModel[];
  projectGroups: ProjectGroup[] = [];
  workForm = new UntypedFormControl();
  selected: HeaderView;
  constructor(
    private indexService: IndexService,
    private commonDataService: CommonDataService,
    private bottomSheet: MatBottomSheet,
    private router: Router
  ) {
    super();
    router.events
      .pipe(takeUntil(this.destroyed))
      .subscribe((event: NavigationStart) => {
        if (event.url !== '/index') {
          this.closeOpera();
        }
      });
  }

  ngOnInit() {
    this.commonDataService.getHeadersGrouppedByProject().then((items) => {
      this.projectGroups = items;
    });

    this.indexService.selectedHeader
      .pipe(takeUntil(this.destroyed))
      .subscribe((selected) => {
        this.selected = selected;
      });

    this.headerSelector.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe((header: HeaderView) => {
        this.indexService.selectedHeader.next(header);
        this.indexService.getIndexTree(header.id);
      });
  }

  closeOpera() {
    this.bottomSheet.dismiss();
  }
}
