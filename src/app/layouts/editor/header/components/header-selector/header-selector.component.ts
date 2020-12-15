import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { EventEnum } from '@shared/enums';
import { Header } from '@shared/models';
import { EditorEventService } from 'app/layouts/editor/editor.event.service';

@Component({
  selector: 'app-header-selector',
  templateUrl: './header-selector.component.html',
  styleUrls: ['./header-selector.component.scss'],
})
export class HeaderSelectorComponent extends BaseComponent implements OnInit {
  headers: Header[];
  selectedId: string;
  constructor(private eventService: EditorEventService) {
    super();
  }

  ngOnInit(): void {
    this.eventService.HEADERS_LOADED.subscribe((items: Header[]) => {
      this.headers = items;
      if (this.headers.length > 0) {
        this.selectedId = items[0].id;
        this.selectionChange(this.selectedId);
      }
    });
  }

  selectionChange(id: string) {
    let selected = this.headers.filter((i) => i.id == id)[0];
    this.eventService.do(EventEnum.HEADER_SELECT, selected);
  }
}
