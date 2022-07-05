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
import { ChunkInfoComponent } from './common/components/chunk-info/chunk-info.component';
import { WorkConditionComponent } from './search/components/condition/work-condition/work-condition.component';
import { MorphConditionComponent } from './search/components/condition/morph-condition/morph-condition.component';
import { SearchMorphCategoryComponent } from './search/components/condition/morph-category/morph-category.component';
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
import { IndexTreeComponent } from './index/components/index-tree/index-tree.component';
import { TopChunksWidgetComponent } from './home/components/top-chunks-widget/top-chunks-widget.component';
import { AboutCorpusComponent } from './home/components/about-corpus/about-corpus.component';
import { NounViewComponent } from './common/components/morph/pos-view/noun-view/noun-view.component';
import { AdjViewComponent } from './common/components/morph/pos-view/adj-view/adj-view.component';
import { AdvViewComponent } from './common/components/morph/pos-view/adv-view/adv-view.component';
import { ConjViewComponent } from './common/components/morph/pos-view/conj-view/conj-view.component';
import { ExclamViewComponent } from './common/components/morph/pos-view/exclam-view/exclam-view.component';
import { NumeralViewComponent } from './common/components/morph/pos-view/numeral-view/numeral-view.component';
import { PartViewComponent } from './common/components/morph/pos-view/part-view/part-view.component';
import { ParticleViewComponent } from './common/components/morph/pos-view/particle-view/particle-view.component';
import { PrepViewComponent } from './common/components/morph/pos-view/prep-view/prep-view.component';
import { PronViewComponent } from './common/components/morph/pos-view/pron-view/pron-view.component';
import { VerbViewComponent } from './common/components/morph/pos-view/verb-view/verb-view.component';
import { ArticleViewComponent } from './common/components/morph/pos-view/article-view/article-view.component';
import { ChunkComponent } from './common/components/chunk/chunk.component';
import { ChunkSetComponent } from './common/components/chunk-set/chunk-set.component';
import { ChunkElementComponent } from './common/components/chunk-element/chunk-element.component';
import { ChunkElementInfoComponent } from './common/components/chunk-element-info/chunk-element-info.component';
import { NoteComponent } from './common/components/note/note.component';
import { NoteItemComponent } from './common/components/note-item/note-item.component';
import { MorphComponent } from './common/components/morph/morph.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    IndexComponent,
    SearchPageComponent,
    ResultTableComponent,
    ChunkInfoComponent,
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
    ChunkComponent,
    ChunkSetComponent,
    ChunkElementComponent,
    ChunkElementInfoComponent,
    NoteComponent,
    NoteItemComponent,
    MorphComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PublicModule { }
