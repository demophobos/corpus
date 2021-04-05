import { Component, OnInit } from '@angular/core';
import { AppConfig } from '@shared/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version: string = AppConfig.AppVersion;

  copyright: string = AppConfig.Copyright;

  constructor() { }

  ngOnInit(): void {

  }

}
