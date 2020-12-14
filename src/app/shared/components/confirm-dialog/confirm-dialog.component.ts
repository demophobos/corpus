import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {

  }

}
