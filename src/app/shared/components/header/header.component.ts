import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Input() title: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {}

  toggleSideBar() {
    this.toggle.emit();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
