import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HeaderView } from '@shared/models';
import { CommonDataService } from '@shared/services/common-data.service';
import { IndexService } from '../../services/index.service';

export interface ProjectGroup {
  code: string;
  headers: HeaderView[];
}

export const _filter = (headers: HeaderView[], value: string): HeaderView[] => {
  const filterValue = value.toLowerCase();

  return headers.filter(
    (item) => item.code.toLowerCase().indexOf(filterValue) === 0
  );
};

/**
 * @title Option groups autocomplete
 */
@Component({
  selector: 'app-work-selector',
  templateUrl: './work-selector.component.html',
  styleUrls: ['./work-selector.component.scss'],
})
export class WorkSelectorComponent implements OnInit {
  workForm = new FormControl();

  projectGroups: ProjectGroup[] = [];

  constructor(private indexService: IndexService) {}

  ngOnInit() {
    this.indexService.getWorkGroups().then((items) => {
      this.projectGroups = items;
    });
  }

  headerChanged(event){
    this.indexService.selectedHeader.next(event.value);
  }
}
