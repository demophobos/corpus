import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { DashboardComponent } from './editor-page/components/dashboard/dashboard.component';
import { EditorComponent } from './editor-page/components/editor-menu/editor-menu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ProjectComponent } from './project/components/project/project.component';
import { ProjectEditorComponent } from './project/components/project-editor/project-editor.component';
import { ProjectSelectorComponent } from './project/components/project-selector/project-selector.component';
import { HeaderSelectorComponent } from './document/components/header/header-selector/header-selector.component';
import { IndexTreeComponent } from './document/components/index/index-tree/index-tree.component';
import { HeaderMenuComponent } from './document/components/header/header-menu/header-menu.component';
import { IndexMenuComponent } from './document/components/index/index-menu/index-menu.component';
import { IndexEditorComponent } from './document/components/index/index-editor/index-editor.component';
import { HeaderEditorComponent } from './document/components/header/header-editor/header-editor.component';
import { ChunkEditorComponent } from './chunk/components/chunk-editor/chunk-editor.component';
import { ChunkAnalyserComponent } from './chunk/components/chunk-analyser/chunk-analyser.component';
import { ChunkViewerComponent } from './chunk/components/chunk-viewer/chunk-viewer.component';
import { ChunkToolbarComponent } from './chunk/components/chunk-toolbar/chunk-toolbar.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    EditorComponent, 
    ProjectComponent, 
    ProjectEditorComponent, 
    ProjectSelectorComponent, 
    HeaderSelectorComponent, 
    IndexTreeComponent, 
    HeaderMenuComponent, 
    IndexMenuComponent, 
    IndexEditorComponent, 
    HeaderEditorComponent, 
    ChunkEditorComponent, 
    ChunkAnalyserComponent, 
    ChunkViewerComponent, ChunkToolbarComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class EditorModule { }
