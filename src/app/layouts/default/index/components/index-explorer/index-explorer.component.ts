import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-explorer',
  templateUrl: './index-explorer.component.html',
  styleUrls: ['./index-explorer.component.scss']
})
export class IndexExplorerComponent implements OnInit {

  title:string = "Index";

  constructor() { }

  ngOnInit(): void {
  }

}
