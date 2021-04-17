import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultComponent } from './default/components/default.component';
import { RouterModule } from '@angular/router';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/components/home/home.component';
import { SharedModule } from '@shared/shared.module';
import { IndexComponent } from './index/components/index/index.component';
import { SearchPageComponent } from './search/components/search-page/search-page.component';
import { ResultTableComponent } from './search/components/result/result-table/result-table.component';
import { ResultChunkComponent } from './search/components/result/result-chunk/result-chunk.component';
import { ResultElementComponent } from './search/components/result/result-element/result-element.component';
import { MorphInfoComponent } from './search/components/morph/morph-info/morph-info.component';
import { ChunkInfoComponent } from './search/components/chunk/chunk-info/chunk-info.component';
import { ChunkMenuComponent } from './search/components/chunk/chunk-menu/chunk-menu.component';
import { CommentPaneComponent } from './search/components/comment/comment-pane/comment-pane.component';
import { WorkConditionComponent } from './search/components/condition/work-condition/work-condition.component';
import { MorphConditionComponent } from './search/components/condition/morph-condition/morph-condition.component';
import { SearchMorphCategoryComponent } from './search/components/morph/morph-category/morph-category.component';
import { CommentWordComponent } from './search/components/comment/comment-word/comment-word.component';
import { CommentChunkComponent } from './search/components/comment/comment-chunk/comment-chunk.component';
import { SearchResultToolbarComponent } from './search/components/search-toolbar/search-toolbar.component';
import { BaseConditionComponent } from './search/components/condition/base-condition/base-condition.component';
import { ResultToolbarComponent } from './search/components/result/result-toolbar/result-toolbar.component';
import { FormConditionComponent } from './search/components/condition/form-condition/form-condition.component';
import { WordCombConditionComponent } from './search/components/condition/word-comb-condition/word-comb-condition.component';
import { DistanceConditionComponent } from './search/components/condition/distance-condition/distance-condition.component';
import { MorphConditionPanelComponent } from './search/components/condition/morph-condition-panel/morph-condition-panel.component';
import { WorkConditionPanelComponent } from './search/components/condition/work-condition-panel/work-condition-panel.component';
import { ExplorerComponent } from './index/components/explorer/explorer.component';
import { WorkSelectorComponent } from './index/components/work-selector/work-selector.component';
import { IndexSelectorComponent } from './index/components/index-selector/index-selector.component';
import { ChunkComponent } from './index/components/chunk/chunk.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    IndexComponent,
    SearchPageComponent,
    ResultTableComponent,
    ResultChunkComponent,
    ResultElementComponent,
    MorphInfoComponent,
    ChunkInfoComponent,
    ChunkMenuComponent,
    CommentPaneComponent,
    WorkConditionComponent,
    MorphConditionComponent,
    SearchMorphCategoryComponent,
    CommentWordComponent,
    CommentChunkComponent,
    SearchResultToolbarComponent,
    BaseConditionComponent,
    ResultToolbarComponent,
    FormConditionComponent,
    WordCombConditionComponent,
    DistanceConditionComponent,
    MorphConditionPanelComponent,
    WorkConditionPanelComponent,
    ExplorerComponent,
    WorkSelectorComponent,
    IndexSelectorComponent,
    ChunkComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PublicModule { }
