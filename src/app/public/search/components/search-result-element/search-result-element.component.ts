import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementView } from '@shared/models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result-element',
  templateUrl: './search-result-element.component.html',
  styleUrls: ['./search-result-element.component.scss']
})
export class SearchResultElementComponent implements OnInit {

  @Input() element : ElementView;
  @Input() selectedValue : string;
  isMorphStyle: boolean = false;
  isSelected: boolean = false;
  constructor(private snackBar: MatSnackBar, private searchService: SearchService) { 
    
  }

  ngOnInit(): void {
    if(this.element){
      this.isMorphStyle = this.element.morphId !== null;
    }
    this.searchService.currentSearch.subscribe(value=>{
      this.selectedValue = value;
      if(this.element){
        this.isSelected = this.element.value == this.selectedValue;
      }
    });
  }
  morphSelected(element:ElementView){

    this.snackBar.dismiss();

    if(element.morphId){
      this.snackBar.open(`${element.form}: ${element.pos}`, 'Морфология');
    }
  }
}
