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
import { WorkConditionComponent } from './search/components/condition/work-condition/work-condition.component';
import { MorphConditionComponent } from './search/components/condition/morph-condition/morph-condition.component';
import { SearchMorphCategoryComponent } from './search/components/morph/morph-category/morph-category.component';
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
import { ChunkNoteComponent } from './search/components/chunk/chunk-note/chunk-note.component';
import { ChunkNoteItemComponent } from './search/components/chunk/chunk-note-item/chunk-note-item.component';
import { IndexTreeComponent } from './index/components/index-tree/index-tree.component';
import { TopChunksWidgetComponent } from './home/components/top-chunks-widget/top-chunks-widget.component';
import { AboutCorpusComponent } from './home/components/about-corpus/about-corpus.component';
import { NounViewComponent } from './search/components/morph/pos-view/noun-view/noun-view.component';
import { AdjViewComponent } from './search/components/morph/pos-view/adj-view/adj-view.component';
import { AdvViewComponent } from './search/components/morph/pos-view/adv-view/adv-view.component';
import { ConjViewComponent } from './search/components/morph/pos-view/conj-view/conj-view.component';
import { ExclamViewComponent } from './search/components/morph/pos-view/exclam-view/exclam-view.component';
import { NumeralViewComponent } from './search/components/morph/pos-view/numeral-view/numeral-view.component';
import { PartViewComponent } from './search/components/morph/pos-view/part-view/part-view.component';
import { ParticleViewComponent } from './search/components/morph/pos-view/particle-view/particle-view.component';
import { PrepViewComponent } from './search/components/morph/pos-view/prep-view/prep-view.component';
import { PronViewComponent } from './search/components/morph/pos-view/pron-view/pron-view.component';
import { VerbViewComponent } from './search/components/morph/pos-view/verb-view/verb-view.component';
import { ArticleViewComponent } from './search/components/morph/pos-view/article-view/article-view.component';
import { ResultMetaInfoComponent } from './search/components/result/result-meta-info/result-meta-info.component';
import { ResultChunkSetComponent } from './search/components/result/result-chunk-set/result-chunk-set.component';

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
    WorkConditionComponent,
    MorphConditionComponent,
    SearchMorphCategoryComponent,
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
    ChunkNoteComponent,
    ChunkNoteItemComponent,
    IndexTreeComponent,
    TopChunksWidgetComponent,
    AboutCorpusComponent,
    NounViewComponent,
    AdjViewComponent,
    AdvViewComponent,
    ConjViewComponent,
    ExclamViewComponent,
    NumeralViewComponent,
    PartViewComponent,
    ParticleViewComponent,
    PrepViewComponent,
    PronViewComponent,
    VerbViewComponent,
    ArticleViewComponent,
    ResultMetaInfoComponent,
    ResultChunkSetComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PublicModule { }
