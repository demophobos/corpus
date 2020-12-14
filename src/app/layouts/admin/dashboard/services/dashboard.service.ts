import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor() { }

  GetCards(): any {
    return [];
    //{ title: 'Manage Articles', cols: 2, rows: 3 }
  }
}
