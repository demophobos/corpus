import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
{
    path: '',
    loadChildren: () => import('./layouts/default/default.module').then(m => m.DefaultModule)
  },
  {
    path: 'editor',
    loadChildren: () => import('./layouts/editor/editor.module').then(m => m.EditorModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    loadChildren: () => import('./layouts/default/default.module').then(m => m.DefaultModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
