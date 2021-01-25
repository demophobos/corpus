import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { TaxonomyViewModel } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-morph-category',
  templateUrl: './search-morph-category.component.html',
  styleUrls: ['./search-morph-category.component.scss']
})
export class SearchMorphCategoryComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() items: TaxonomyViewModel[];
  @Input() title: string;
  @Input() selectedItems: string[];
  @Output() selected: EventEmitter<void> = new EventEmitter();
  selector = new FormControl();
  
  constructor() {
    super();
  }
  ngAfterViewInit(): void {
    this.selector.valueChanges.subscribe((values)=>{
      this.selected.emit(values);
    });
  }

  ngOnInit(): void {
    this.selector.setValue(this.selectedItems);
  }
}
