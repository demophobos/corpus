import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  public errorHandler(response: any): string {
    this.snackBar.open(response.message, 'ERROR');
    return response;
  }
}
