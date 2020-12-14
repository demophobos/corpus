import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { Header, Index, Project } from '@shared/models';
import { DialogService } from '@shared/services';
import { DocumentService } from '../../../services/document.service';
import { ProjectService } from '../../../../project/services/project.service';
import { HeaderEditorComponent } from '../header-editor/header-editor.component';
import { IndexEditorComponent } from '../../index/index-editor/index-editor.component';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent extends BaseComponent implements OnInit {

  private selectedDocumentHeader: Header;
  private selectedProject: Project;
  editDisabled: boolean = true;
  constructor(private dialogService: DialogService, private documentService: DocumentService, private projectService: ProjectService) {
    super();
  }

  ngOnInit(): void {
    this.projectService.selectedProject$.subscribe(item => {
      this.selectedProject = item;
    })
    this.documentService.selectedHeader$.subscribe(item => {
      this.selectedDocumentHeader = item;
      this.editDisabled = item == undefined;
    });
  }

  deleteDocument() {
    if(this.selectedDocumentHeader){
      this.dialogService.confirm(this.selectedDocumentHeader.name, 'Are you sure?')
      .toPromise().then(confirmed => {
        if (confirmed) {
          this.documentService.deleteHeader(this.selectedDocumentHeader);
        }
      });
    }
  }

  editDocumentHeader() {
    this.dialogService.showComponent(HeaderEditorComponent, this.selectedDocumentHeader, AppConfig.DefaultDialogWidth);
  }
  
  addDocumentHeader() {
    let newDocumentHeader = new Header({ projectId: this.selectedProject.id });
    this.dialogService.showComponent(HeaderEditorComponent, newDocumentHeader, AppConfig.DefaultDialogWidth);
  }

  addTopIndex() {
    let newDocumentIndex = new Index({headerId:this.selectedDocumentHeader.id});
    this.dialogService.showComponent(IndexEditorComponent,{parent: undefined, index: newDocumentIndex}, AppConfig.DefaultDialogWidth);
  }
}
