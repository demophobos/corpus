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
import { SearchOptionsComponent } from './search/components/search-options/search-options.component';
import { SearchResultChunkComponent } from './search/components/search-result-chunk/search-result-chunk.component';
import { SearchResultElementComponent } from './search/components/search-result-element/search-result-element.component';
import { MorphInfoComponent } from './search/components/morph-info/morph-info.component';
import { ChunkInfoComponent } from './search/components/chunk-info/chunk-info.component';
import { ChunkMenuComponent } from './search/components/chunk-menu/chunk-menu.component';
import { BaseSearchComponent } from './search/components/base-search/base-search.component';
import { CommentComponent } from './search/components/comment/comment.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    IndexComponent,
    IndexExplorerComponent,
    WorkExplorerComponent,
    SearchComponent,
    SearchResultComponent,
    SearchOptionsComponent,
    SearchResultChunkComponent,
    SearchResultElementComponent,
    MorphInfoComponent,
    ChunkInfoComponent,
    ChunkMenuComponent,
    BaseSearchComponent,
    CommentComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PublicModule { }
