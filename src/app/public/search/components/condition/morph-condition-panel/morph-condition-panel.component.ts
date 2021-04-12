import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { ChunkQuery } from '@shared/models';
import { DialogService } from '@shared/services';
import { SearchService } from 'app/public/search/services/search.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeUntil } from 'rxjs/operators';
import { MorphConditionComponent } from '../morph-condition/morph-condition.component';

@Component({
  selector: 'app-morph-condition-panel',
  templateUrl: './morph-condition-panel.component.html',
  styleUrls: ['./morph-condition-panel.component.scss']
})
export class MorphConditionPanelComponent extends BaseComponent implements OnInit{
  morphItems: string[];
  query: ChunkQuery;
  searchLemma:boolean = false;
  deviceInfo = null;
  isMobile = false;
  constructor(private dialogService: DialogService, private searchService: SearchService, private deviceService: DeviceDetectorService) {
    super();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
    });
    this.searchService.selectedAttributes.pipe(takeUntil(this.destroyed)).subscribe(items=>{
      this.morphItems = items;
    });
    this.searchService.searchLemma.pipe(takeUntil(this.destroyed)).subscribe(searchLemma=>{
      this.searchLemma = searchLemma;
    });
  }
  showMorphSelector(){
    this.dialogService.showComponent(MorphConditionComponent, null, AppConfig.DefaultDialogWidth, false);
  }

  removeMorphItem(item){
    this.morphItems = this.morphItems.filter(i=> i !== item);
    this.query.pos = this.query.pos.filter(i=> i !== item);
    this.query.case = this.query.case.filter(i=> i !== item);
    this.query.degree = this.query.degree.filter(i=> i !== item);
    this.query.gender = this.query.gender.filter(i=> i !== item);
    this.query.mood = this.query.mood.filter(i=> i !== item);
    this.query.number = this.query.number.filter(i=> i !== item);
    this.query.person = this.query.person.filter(i=> i !== item);
    this.query.tense = this.query.tense.filter(i=> i !== item);
    this.query.voice = this.query.voice.filter(i=> i !== item);
    this.searchService.chunkQuery.next(this.query);
    this.searchService.setSelectedMorphAttrubutes(this.query);
  }
}
