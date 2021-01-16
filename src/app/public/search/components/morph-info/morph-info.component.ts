import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ElementView } from '@shared/models';

@Component({
  selector: 'app-morph-info',
  templateUrl: './morph-info.component.html',
  styleUrls: ['./morph-info.component.scss']
})
export class MorphInfoComponent implements OnInit {
  data: ElementView;
  info: string;
  constructor(private dialogRef: MatDialogRef<MorphInfoComponent>) { }

  ngOnInit(): void {
    this.info = JSON.stringify(this.getPurgedObj(this.data));
  }

  getPurgedObj(obj){
    let stringfiedObj = JSON.stringify(obj, (key, value) => {
      return ['', null].includes(value) || (typeof value === 'object' &&(value.length === 0 || 
        Object.keys(value).length === 0)) ? undefined : value;
    });
    let resObj = JSON.parse(stringfiedObj);
    let isEmptyPropsPresent = ['{}', '[]', '""', 'null'].some((key) => stringfiedObj.includes(key))
    if(isEmptyPropsPresent) {
      return this.getPurgedObj(resObj);
    }
    return resObj;
  }

}
