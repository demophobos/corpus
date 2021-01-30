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
import { SearchPageComponent } from './search/components/search-page/search-page.component';
import { SearchResultComponent } from './search/components/result/search-result/search-result.component';
import { SearchResultChunkComponent } from './search/components/result/search-result-chunk/search-result-chunk.component';
import { SearchResultElementComponent } from './search/components/result/search-result-element/search-result-element.component';
import { MorphInfoComponent } from './search/components/result/morph-info/morph-info.component';
import { ChunkInfoComponent } from './search/components/result/chunk-info/chunk-info.component';
import { ChunkMenuComponent } from './search/components/result/chunk-menu/chunk-menu.component';
import { CommentPaneComponent } from './search/components/comment/comment-pane/comment-pane.component';
import { SearchAuthorWorkOptionsComponent } from './search/components/condition/author-work-condition/author-work-condition.component';
import { SearchMorphOptionsComponent } from './search/components/condition/morph-condition/morph-condition.component';
import { SearchMorphCategoryComponent } from './search/components/condition/morph-category/morph-category.component';
import { CommentWordComponent } from './search/components/comment/comment-word/comment-word.component';
import { CommentChunkComponent } from './search/components/comment/comment-chunk/comment-chunk.component';
import { SearchResultToolbarComponent } from './search/components/search-toolbar/search-toolbar.component';
import { BaseConditionComponent } from './search/components/condition/base-condition/base-condition.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    IndexComponent,
    IndexExplorerComponent,
    WorkExplorerComponent,
    SearchPageComponent,
    SearchResultComponent,
    SearchResultChunkComponent,
    SearchResultElementComponent,
    MorphInfoComponent,
    ChunkInfoComponent,
    ChunkMenuComponent,
    CommentPaneComponent,
    SearchAuthorWorkOptionsComponent,
    SearchMorphOptionsComponent,
    SearchMorphCategoryComponent,
    CommentWordComponent,
    CommentChunkComponent,
    SearchResultToolbarComponent,
    BaseConditionComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PublicModule { }
