import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '@shared/components';
import { ElementView } from '@shared/models';

@Component({
  selector: 'app-morph-info',
  templateUrl: './morph-info.component.html',
  styleUrls: ['./morph-info.component.scss']
})
export class MorphInfoComponent extends BaseComponent implements OnInit {

  @Input() element: ElementView;

  constructor() {
    super();
  }

  ngOnInit(): void {
    
  }

}
