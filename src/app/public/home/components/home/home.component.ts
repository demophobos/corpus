import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements AfterContentInit  {
  constructor(private homeService: HomeService) {
    super();
  }
  ngAfterContentInit(): void {
    this.homeService.getTopUpdatedChunks();
  }

}
