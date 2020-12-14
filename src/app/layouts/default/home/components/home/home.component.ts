import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  cards = [];

  constructor(private readonly dashboardService: HomeService) {
    super();
  }

  ngOnInit(): void {
    this.cards = this.dashboardService.GetCards();
  }

}
