import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './editor-page/components/dashboard/dashboard.component';
import { EditorComponent } from './editor-page/components/editor-menu/editor-menu.component';
import { ProjectComponent } from './project/components/project/project.component';


const routes: Routes = [
  {
    path: '', component: EditorComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'project', component: ProjectComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
