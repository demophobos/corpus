import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-explorer',
  templateUrl: './work-explorer.component.html',
  styleUrls: ['./work-explorer.component.scss']
})
export class WorkExplorerComponent implements OnInit {

  title: string = "Works";

  constructor() { }

  ngOnInit(): void {
  }

}
