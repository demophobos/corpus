import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { HeaderView } from '@shared/models';
import { CommonDataService } from '@shared/services/common-data.service';
import { IndexService, ProjectGroup } from '../../services/index.service';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { IndexTreeComponent } from '../index-tree/index-tree.component';

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
})
export class WorkSelectorComponent extends BaseComponent implements OnInit {
  workForm = new FormControl();
  indexAvailable = false;
  projectGroups: ProjectGroup[] = [];

  constructor(
    private indexService: IndexService,
    private commonDataService: CommonDataService,
    private bottomSheet: MatBottomSheet
  ) {
    super();
  }

  ngOnInit() {
    this.commonDataService
      .getHeadersGrouppedByProject()
      .then((items) => {
        this.projectGroups = items;
        if (history.state.headerId) {
          //header from search page navigation
          const header = this.commonDataService.headers.value.find(
            (i) => i.id == history.state.headerId
          );
          this.headerChanged(header);
          this.indexAvailable = header !== null;
          history.state.headerId = undefined;
        }
      })
      .then(() => {
        var header = this.indexService.selectedHeader.getValue();
        this.workForm.setValue(header);
        this.indexAvailable = !!header;
      });
  }

  headerChanged(header: HeaderView) {
    this.indexService.selectedChunk.next(undefined);
    this.indexService.selectedIndeces.next(undefined);
    this.indexService.selectedIndex.next(undefined);
    this.indexService.selectedHeader.next(header);
    this.indexAvailable = !!header;
  }

  openIndex(event) {
    event.stopPropagation();
    this.bottomSheet.open(IndexTreeComponent, { hasBackdrop: false, autoFocus:'first-tabbable' });
  }
}
