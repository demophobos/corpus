import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result-text',
  templateUrl: './search-result-text.component.html',
  styleUrls: ['./search-result-text.component.scss']
})
export class SearchResultTextComponent implements OnInit {
  @Input() chunk: any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
