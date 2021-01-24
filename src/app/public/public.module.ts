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
import { SearchResultChunkComponent } from './search/components/search-result-chunk/search-result-chunk.component';
import { SearchResultElementComponent } from './search/components/search-result-element/search-result-element.component';
import { MorphInfoComponent } from './search/components/morph-info/morph-info.component';
import { ChunkInfoComponent } from './search/components/chunk-info/chunk-info.component';
import { ChunkMenuComponent } from './search/components/chunk-menu/chunk-menu.component';
import { SearchRulesComponent } from './search/components/search-rules/search-rules.component';
import { CommentComponent } from './search/components/comment/comment.component';
import { SearchFormTypeOptionsComponent } from './search/components/search-form-type-options/search-form-type-options.component';
import { SearchAuthorWorkOptionsComponent } from './search/components/search-author-work-options/search-author-work-options.component';
import { SearchMorphOptionsComponent } from './search/components/search-morph-options/search-morph-options.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    IndexComponent,
    IndexExplorerComponent,
    WorkExplorerComponent,
    SearchComponent,
    SearchResultComponent,
    SearchResultChunkComponent,
    SearchResultElementComponent,
    MorphInfoComponent,
    ChunkInfoComponent,
    ChunkMenuComponent,
    SearchRulesComponent,
    CommentComponent,
    SearchFormTypeOptionsComponent,
    SearchAuthorWorkOptionsComponent,
    SearchMorphOptionsComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PublicModule { }
