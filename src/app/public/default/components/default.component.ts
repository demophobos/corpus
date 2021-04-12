import { Component, OnInit } from '@angular/core';
import { DefaultService } from '../services/default.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@shared/components/base/base.component';
import { AppConfig } from '@shared/constants';
import { MenuItem } from '@shared/models';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent extends BaseComponent implements OnInit {

  menuItems = [];

  title: string;

  sideBarOpen = false;

  deviceInfo = null;

  constructor(private readonly defaultService: DefaultService, private deviceService: DeviceDetectorService) {
    super();

    this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      if(isMobile){
        this.title = AppConfig.AppShortTitle;
      }else{
        this.title = AppConfig.AppFullTitle;
      }
  }

  ngOnInit(): void {
    this.defaultService.menuItems$.pipe(takeUntil(this.destroyed)).subscribe(items => {
      this.menuItems = items;
    });
  }

  menuItemSelected(menuItem: MenuItem) {
    this.sideBarOpen = false;
  }
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
