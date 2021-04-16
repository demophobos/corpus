import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonDataService } from '@shared/services/common-data.service';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent implements OnInit {
  myControl = new FormControl();
  languages: string[] = ['lat', 'rus'];
  constructor(private indexService: IndexService) { 
    
  }

  ngOnInit(): void {

  }

  langChanged(event){
    this.indexService.selectedLang.next(event.value);
  }

}
