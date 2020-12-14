import { Injectable } from '@angular/core';
import { MenuItemType } from '@shared/enums';
import { MenuItem } from '@shared/models';
import { ReplaySubject } from 'rxjs';
import { ActionEnum } from './action.enum';
import { UrlEnum } from './url.enum';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private menuData = new ReplaySubject<MenuItem[]>(1);
  menuItems$: ReplaySubject<MenuItem[]> = this.menuData;

  constructor() {
    this.GetMenuItems();
  }

  GetMenuItems() {
    this.menuData.next([
      new MenuItem({
        title: 'Dashboard',
        action: ActionEnum.ViewDashboard,
        icon: 'dashboard',
        link: UrlEnum.Editor,
        type: MenuItemType.Normal,
      }),
      new MenuItem({ type: MenuItemType.Divider }),
      new MenuItem({
        title: 'New Project',
        action: ActionEnum.NewProject,
        icon: 'add',
        link: UrlEnum.Editor,
        type: MenuItemType.Normal,
      }),
      new MenuItem({
        title: 'Open Project',
        action: ActionEnum.OpenProject,
        icon: 'folder_open',
        link: UrlEnum.Editor,
        type: MenuItemType.Normal,
      }),
    ]);
  }
}
