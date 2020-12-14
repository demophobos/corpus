import { Component, OnInit } from '@angular/core';
import { DefaultService } from '../services/default.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@shared/components/base/base.component';
import { AppConfig } from '@shared/constants';
import { MenuItem } from '@shared/models';
import { SnackBarService } from '@core/services';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent extends BaseComponent implements OnInit {

  menuItems = [];

  title = `${AppConfig.AppFullTitle}`;

  sideBarOpen = false;

  constructor(private readonly defaultService: DefaultService, private readonly snackBarService: SnackBarService) {
    super();
  }

  ngOnInit(): void {
    this.defaultService.menuItems$.pipe(takeUntil(this.destroyed)).subscribe(items => {
      this.menuItems = items;
    });
  }

  menuItemSelected(menuItem: MenuItem) {
    this.snackBarService.open(menuItem.title, menuItem.action.toString());
    this.sideBarOpen = false;
  }
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
