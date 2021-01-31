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
import { ResultTableComponent } from './search/components/result/result-table/result-table.component';
import { ResultChunkComponent } from './search/components/result/result-chunk/result-chunk.component';
import { ResultElementComponent } from './search/components/result/result-element/result-element.component';
import { MorphInfoComponent } from './search/components/result/morph-info/morph-info.component';
import { ChunkInfoComponent } from './search/components/result/chunk-info/chunk-info.component';
import { ChunkMenuComponent } from './search/components/result/chunk-menu/chunk-menu.component';
import { CommentPaneComponent } from './search/components/comment/comment-pane/comment-pane.component';
import { WorkConditionComponent } from './search/components/condition/work-condition/work-condition.component';
import { SearchMorphOptionsComponent } from './search/components/condition/morph-condition/morph-condition.component';
import { SearchMorphCategoryComponent } from './search/components/condition/morph-category/morph-category.component';
import { CommentWordComponent } from './search/components/comment/comment-word/comment-word.component';
import { CommentChunkComponent } from './search/components/comment/comment-chunk/comment-chunk.component';
import { SearchResultToolbarComponent } from './search/components/search-toolbar/search-toolbar.component';
import { BaseConditionComponent } from './search/components/condition/base-condition/base-condition.component';
import { ConditionToolbarComponent } from './search/components/condition/condition-toolbar/condition-toolbar.component';
import { ResultToolbarComponent } from './search/components/result/result-toolbar/result-toolbar.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    IndexComponent,
    IndexExplorerComponent,
    WorkExplorerComponent,
    SearchPageComponent,
    ResultTableComponent,
    ResultChunkComponent,
    ResultElementComponent,
    MorphInfoComponent,
    ChunkInfoComponent,
    ChunkMenuComponent,
    CommentPaneComponent,
    WorkConditionComponent,
    SearchMorphOptionsComponent,
    SearchMorphCategoryComponent,
    CommentWordComponent,
    CommentChunkComponent,
    SearchResultToolbarComponent,
    BaseConditionComponent,
    ConditionToolbarComponent,
    ResultToolbarComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PublicModule { }
