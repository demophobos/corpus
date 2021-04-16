import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '@shared/components';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogService {

  constructor(private readonly dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: `500px`, hasBackdrop: true });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }

  public showSpinner() {
    return this.showLoader(SpinnerComponent);
  }

  public showComponent(modalComponent: any, modalData: any, width: string, disableClose: boolean = true): Observable<any> {
    const dialogRef = this.dialog.open(modalComponent, { width: `${width}px`, hasBackdrop: true });
    dialogRef.componentInstance['data'] = modalData;
    dialogRef.disableClose = disableClose;
    return dialogRef.afterClosed();
  }

  public showLoader(modalComponent: any) {
    const dialogRef = this.dialog.open(modalComponent, { width: `100%`, hasBackdrop: true });
    dialogRef.disableClose = true;
    return dialogRef;
  }
}
