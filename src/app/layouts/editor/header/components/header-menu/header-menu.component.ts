import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { Header, Index, Project } from '@shared/models';
import { EditorEventService } from 'app/layouts/editor/editor.event.service';
import { EventEnum } from '@shared/enums';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent extends BaseComponent implements OnInit {
  private selectedDocumentHeader: Header;
  private selectedProject: Project;
  editDisabled: boolean = true;
  constructor(private eventService: EditorEventService) {
    super();
  }

  ngOnInit(): void {
    this.eventService.PROJECT_SELECTED.subscribe((project: Project) => {
      this.selectedProject = project;
    });
    this.eventService.HEADER_SELECTED.subscribe((header: Header) => {
      this.selectedDocumentHeader = header;
      this.editDisabled = header == undefined;
    });
  }

  deleteDocument() {
    this.eventService.do(EventEnum.HEADER_DELETE, this.selectedDocumentHeader);
  }

  editDocumentHeader() {
    this.eventService.do(EventEnum.HEADER_UPDATE, this.selectedDocumentHeader);
  }

  addDocumentHeader() {
    this.eventService.do(EventEnum.HEADER_CREATE, {
      projectId: this.selectedProject.id,
    });
  }

  addTopIndex() {
    this.eventService.do(EventEnum.INDEX_CREATE, {
      parent: undefined,
      index: new Index({
        headerId: this.selectedDocumentHeader.id,
      }),
    });
  }
}
