import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthService } from '@core/services';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { MenuItem, Project } from '@shared/models';
import { DialogService } from '@shared/services';
import { ProjectEditorComponent } from 'app/layouts/editor/project/components/project-editor/project-editor.component';
import { ProjectSelectorComponent } from 'app/layouts/editor/project/components/project-selector/project-selector.component';
import { takeUntil } from 'rxjs/operators';
import { ActionEnum } from '../../services/action.enum';
import { EditorService } from '../../services/editor.service';

@Component({
  selector: 'app-editor-menu',
  templateUrl: './editor-menu.component.html',
  styleUrls: ['./editor-menu.component.scss'],
})
export class EditorComponent extends BaseComponent implements OnInit {
  menuItems = [];

  title = `${AppConfig.AppFullTitle} [Editor]`;

  sideBarOpen = false;

  constructor(
    private readonly editorService: EditorService,
    private dialogService: DialogService,
    private bottomSheet: MatBottomSheet,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.editorService.menuItems$
      .pipe(takeUntil(this.destroyed))
      .subscribe((items) => {
        this.menuItems = items;
      });
    this.authService.user$.subscribe((user) => {
      this.title = `${AppConfig.AppFullTitle} [${user.email}]`;
    });
  }

  menuItemSelected(menuItem: MenuItem) {
    switch (menuItem.action) {
      case ActionEnum.NewProject:
        this.dialogService.showComponent(
          ProjectEditorComponent,
          new Project({}),
          AppConfig.DefaultDialogWidth
        );
        break;
      case ActionEnum.OpenProject:
        this.bottomSheet.open(ProjectSelectorComponent);
        break;
      default:
        break;
    }
    this.sideBarOpen = false;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
