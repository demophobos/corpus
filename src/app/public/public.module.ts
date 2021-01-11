import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultComponent } from './default/components/default.component';
import { RouterModule } from '@angular/router';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/components/home/home.component';
import { SharedModule } from '@shared/shared.module';
import { IndexComponent } from './index/components/index/index.component';
import { IndexExplorerComponent } from './index/components/index-explorer/index-explorer.component';
import { WorkExplorerComponent } from './index/components/work-explorer/work-explorer.component';
import { SearchComponent } from './search/components/search/search.component';
import { SearchResultComponent } from './search/components/search-result/search-result.component';
import { SearchSettingsComponent } from './search/components/search-settings/search-settings.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    IndexComponent,
    IndexExplorerComponent,
    WorkExplorerComponent,
    SearchComponent,
    SearchResultComponent,
    SearchSettingsComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PublicModule { }
