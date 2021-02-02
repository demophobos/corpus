import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { SearchService } from 'app/public/search/services/search.service';

@Component({
  selector: 'app-condition-toolbar',
  templateUrl: './condition-toolbar.component.html',
  styleUrls: ['./condition-toolbar.component.scss']
})
export class ConditionToolbarComponent extends BaseComponent implements OnInit {
  
  @Output() onShowWork: EventEmitter<void> = new EventEmitter();
  @Output() onShowMorph: EventEmitter<void> = new EventEmitter();

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
  }

  showWorkCondition(){
    this.onShowWork.emit();
  }

  showMorphCondition(){
    this.onShowMorph.emit();
  }
}
