import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@shared/components/base/base.component';
import { AppConfig } from '@shared/constants';
import { MenuItem } from '@shared/models';
import { SnackBarService } from '@core/services';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseComponent implements OnInit {

  menuItems = [];

  title = `${AppConfig.AppFullTitle} [Admin]`;

  sideBarOpen = false;

  constructor(private readonly adminService: AdminService, private readonly snackBarService: SnackBarService) {
    super();
  }

  ngOnInit(): void {
    this.adminService.menuItems$.pipe(takeUntil(this.destroyed)).subscribe(items => {
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
