import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-settings',
  templateUrl: './search-settings.component.html',
  styleUrls: ['./search-settings.component.scss']
})
export class SearchSettingsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SearchSettingsComponent>) { }

  ngOnInit(): void {
  }

  save(){
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }
}
