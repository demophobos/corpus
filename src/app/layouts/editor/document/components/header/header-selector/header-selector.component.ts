import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { Header } from '@shared/models';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-header-selector',
  templateUrl: './header-selector.component.html',
  styleUrls: ['./header-selector.component.scss']
})
export class HeaderSelectorComponent extends BaseComponent implements OnInit {
  headers: Header[];
  selectedId: string;
  constructor(private documentService: DocumentService) {
    super();
  }

  ngOnInit(): void {
    this.documentService.headers$.subscribe(items => {
      this.headers = items;
      if (this.headers.length > 0) {
        this.selectedId = items[0].id;
        this.selectionChange(this.selectedId);
      }
    })
  }

  selectionChange(id: string) {
    this.documentService.selectDocumentHeader(this.headers.filter(i => i.id == id)[0]);
  }
}
