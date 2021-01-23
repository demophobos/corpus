import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ElementView } from '@shared/models';

@Component({
  selector: 'app-morph-info',
  templateUrl: './morph-info.component.html',
  styleUrls: ['./morph-info.component.scss']
})
export class MorphInfoComponent implements OnInit {

  @Input() element: ElementView;

  constructor() { }

  ngOnInit(): void {
    
  }

}
