import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent extends BaseComponent implements OnInit {
  selectorAreaSize: Number = 20;
  textAreaSize: Number = 80;
  gutterSize: Number = 11;
  useTransition: Boolean = true;
  constructor() {
    super();
  }

  ngOnInit(): void {}

  areaDividerClick() {
    if (this.selectorAreaSize > 0) {
      this.selectorAreaSize = 0;
      this.textAreaSize = 100;
    } else {
      this.selectorAreaSize = 20;
      this.textAreaSize = 80;
    }
  }
}
