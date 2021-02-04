import { ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { TaxonomyViewModel } from '@shared/models';

@Component({
  selector: 'app-morph-category',
  templateUrl: './morph-category.component.html',
  styleUrls: ['./morph-category.component.scss'],
})
export class SearchMorphCategoryComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnChanges {
  panelOpenState = false;
  @Input() items: TaxonomyViewModel[];
  @Input() title: string;
  @Input() selectedItems: string[];
  @Output() selected: EventEmitter<void> = new EventEmitter();
  selector = new FormControl();

  constructor() {
    super();
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItems) {
      this.selectedItems = changes.selectedItems.currentValue;
      this.selector.setValue(this.selectedItems);
    }
  }
  ngAfterViewInit(): void {
    this.selector.valueChanges.subscribe((values) => {
      this.selected.emit(values);
    });
  }

  ngOnInit(): void {
    this.selector.setValue(this.selectedItems);
  }
}
