import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { RoleEditorComponent } from './user/components/role-editor/role-editor.component';
import { AdminComponent } from './admin/components/admin.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    RoleEditorComponent,
    AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    RouterModule
  ],
  entryComponents: [
    RoleEditorComponent
  ]
})
export class AdminModule { }
