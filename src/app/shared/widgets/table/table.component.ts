import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  title: string;
  description: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() items: Observable<any[]>;
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  displayedColumns: string[] = ['title', 'description'];
  dataSource = [];

  constructor() { }


  ngOnInit() {
    // this.items.subscribe(i => {
    //   this.dataSource = i;
    // });
  }

  onRowClicked(item: any){
    this.itemSelected.emit(item);
    console.log('item selected: ', item);
  }

}
