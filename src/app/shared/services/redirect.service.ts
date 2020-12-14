import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RedirectService {
  readonly dashboardUrl = '/dashboard';
  readonly feedRouteMap = {
    ProjectNews: '',
    Announcement: this.dashboardUrl,
    Event: this.dashboardUrl
  };
  constructor(private readonly router: Router) { }

  public navigateToFeed(category) {
    if (category) {
      this.router.navigate([this.feedRouteMap[category] || this.dashboardUrl]);
    }
  }
}
