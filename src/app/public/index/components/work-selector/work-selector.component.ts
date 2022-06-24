import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { HeaderView } from '@shared/models';
import { CommonDataService } from '@shared/services/common-data.service';
import { IndexService, ProjectGroup } from '../../services/index.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IndexTreeComponent } from '../index-tree/index-tree.component';
import { MatPaginator } from '@angular/material/paginator';

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
  workForm = new UntypedFormControl();
  indexAvailable = false;
  projectGroups: ProjectGroup[] = [];
  header: HeaderView;
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
          this.header = this.commonDataService.headers.value.find(
            (i) => i.id == history.state.headerId
          );
          this.headerChanged(this.header);
          this.indexAvailable = this.header !== null;
          history.state.headerId = undefined;
        }
      })
      .then(() => {
        this.header = this.indexService.selectedHeader.getValue();
        this.workForm.setValue(this.header);
        this.indexAvailable = !!this.header;
      });
  }

  async headerChanged(header: HeaderView) {
    this.header = header;
    this.indexService.selectedChunk.next(undefined);
    this.indexService.selectedIndeces.next(undefined);
    this.indexService.selectedIndex.next(undefined);
    if (
      this.indexService.selectedHeader.getValue() === undefined ||
      this.header.id !== this.indexService.selectedHeader.getValue().id
    ) {
      this.indexService.selectedHeader.next(this.header);
      await this.indexService.getIndexTree(this.header.id);
    }
    this.indexAvailable = !!this.header;
  }

  openIndex(event) {
    event.stopPropagation();
    this.bottomSheet.open(IndexTreeComponent, {
      hasBackdrop: false,
      autoFocus: 'first-tabbable',
    });
  }
}
