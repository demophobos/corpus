import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { ChunkQuery, HeaderModel } from '@shared/models';
import { DialogService } from '@shared/services';
import { SearchService } from 'app/public/search/services/search.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeUntil } from 'rxjs/operators';
import { WorkConditionComponent } from '../work-condition/work-condition.component';

@Component({
  selector: 'app-work-condition-panel',
  templateUrl: './work-condition-panel.component.html',
  styleUrls: ['./work-condition-panel.component.scss']
})
export class WorkConditionPanelComponent extends BaseComponent implements OnInit {
  query: ChunkQuery;
  morphItems: string[];
  workItems: HeaderModel[];
  constructor(private dialogService: DialogService, private searchService: SearchService, private deviceService: DeviceDetectorService) {
    super(deviceService);
  }

  ngOnInit(): void {
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
      
    });
    this.searchService.selectedWorks.pipe(takeUntil(this.destroyed)).subscribe(items=>{
      this.workItems = items;
    });
  }
  showWorkSelector(){
    this.dialogService.showComponent(WorkConditionComponent, null, AppConfig.DefaultDialogWidth, false);
  }

  removeWorkItem(item: HeaderModel){
    this.workItems = this.workItems.filter(i=> i.id !== item.id);
    this.query.headers = this.query.headers.filter(i=>i !== item.id)
    this.searchService.chunkQuery.next(this.query);
    this.searchService.selectedWorks.next(this.workItems);
  }
  
}
