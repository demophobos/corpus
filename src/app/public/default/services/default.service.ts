import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { AppConfig } from '@shared/constants';
import { MenuItemType } from '@shared/enums';
import { ChunkView, MenuItem, PageResponse } from '@shared/models';
import { ReplaySubject } from 'rxjs';
import { ActionEnum } from './action.enum';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  private menuData = new ReplaySubject<MenuItem[]>(1);

  menuItems$: ReplaySubject<MenuItem[]> = this.menuData;

  constructor() {
    this.GetMenuItems();
  }

  GetMenuItems() {
    this.menuData.next([
      new MenuItem({ title: 'De Corpore Latino-Rossico', action: ActionEnum.ViewHome, icon: 'home', link: '/', type: MenuItemType.Normal }),
      new MenuItem({ title: 'Index Operum', action: ActionEnum.ViewIndex, icon: 'works', link: 'index', type: MenuItemType.Normal  }),
      new MenuItem({ title: 'Inquisitio', action: ActionEnum.ViewSearch, icon: 'search', link: 'search', type: MenuItemType.Normal  })
    ]);
  }
}
