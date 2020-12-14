import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  cards = [];

  constructor(private readonly dashboardService: DashboardService) {
    super();
  }

  ngOnInit(): void {
    this.cards = this.dashboardService.GetCards();
  }

}
