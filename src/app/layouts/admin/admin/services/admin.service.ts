import { Injectable } from '@angular/core';
import { MenuItemType } from '@shared/enums';
import { MenuItem } from '@shared/models';
import { ReplaySubject } from 'rxjs';
import { ActionEnum } from './action.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private menuData = new ReplaySubject<MenuItem[]>(1);

  menuItems$: ReplaySubject<MenuItem[]> = this.menuData;

  constructor() {
    this.GetMenuItems();
  }
  GetMenuItems() {
    this.menuData.next([
      new MenuItem({ title: 'Dashboard', action: ActionEnum.ViewDashboard, icon: 'dashboard', type: MenuItemType.Normal }),
      new MenuItem({ type: MenuItemType.Divider  }),
      new MenuItem({ title: 'Roles', action: ActionEnum.ViewRoles, icon: 'role', type: MenuItemType.Normal }),
      new MenuItem({ title: 'Users', action: ActionEnum.ViewUsers, icon: 'user', type: MenuItemType.Normal }),
      new MenuItem({ title: 'Permissions', action: ActionEnum.ViewPermissions, icon: 'perm', type: MenuItemType.Normal }),
      new MenuItem({ title: 'Taxonomy', action: ActionEnum.ViewTaxonomy, icon: 'taxonomy', type: MenuItemType.Normal })
    ]);
  }
}
