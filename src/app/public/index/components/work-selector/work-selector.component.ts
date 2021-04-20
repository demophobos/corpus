import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { HeaderView } from '@shared/models';
import { CommonDataService } from '@shared/services/common-data.service';
import { first, takeUntil } from 'rxjs/operators';
import { IndexService, ProjectGroup } from '../../services/index.service';

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

  projectGroups: ProjectGroup[] = [];

  constructor(private indexService: IndexService, private commonDataService: CommonDataService) {
    super();
  }

  ngOnInit() {
    this.commonDataService.getHeadersGrouppedByProject().then((items) => {
      this.projectGroups = items;
      if(history.state.headerId){ //header from search page navigation
        const header = this.commonDataService.headers.value.find(i=>i.id == history.state.headerId);
        this.headerChanged(header);
        history.state.headerId = undefined;
      }
    }).then(()=>{
      this.workForm.setValue(this.indexService.selectedHeader.getValue());
    });
  }

  headerChanged(header: HeaderView){
    this.indexService.selectedChunk.next(undefined);
    this.indexService.selectedIndeces.next(undefined);
    this.indexService.selectedIndex.next(undefined);
    this.indexService.selectedHeader.next(header);
  }
}