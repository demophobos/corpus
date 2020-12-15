import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { EditorService } from '../../services/editor.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  cards = [];

  constructor(private readonly editorService: EditorService) {
    super();
  }

  ngOnInit(): void {
    this.cards = this.editorService.GetCards();
  }

}
