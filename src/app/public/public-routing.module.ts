import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { DefaultComponent } from './default/components/default.component';
import { IndexComponent } from './index/components/index/index.component';
import { SearchPageComponent } from './search/components/search-page/search-page.component';


const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'index', component: IndexComponent },
      { path: 'search', component: SearchPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
