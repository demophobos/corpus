import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { TaxonomyCategoryEnum } from '@shared/enums/taxonomy-category-enum';
import { ChunkQuery, TaxonomyViewModel } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-morph-options',
  templateUrl: './search-morph-options.component.html',
  styleUrls: ['./search-morph-options.component.scss']
})
export class SearchMorphOptionsComponent extends BaseComponent implements OnInit {
  panelOpenState = false;
  categorySelector = new FormControl();
  query: ChunkQuery;
  categoryItems: TaxonomyViewModel[];
  pos: string = TaxonomyCategoryEnum.Pos;
  tempus: string = TaxonomyCategoryEnum.Tense;
  modus: string = TaxonomyCategoryEnum.Mood;
  genus: string = TaxonomyCategoryEnum.Gender;
  numerus: string = TaxonomyCategoryEnum.Number;
  persona: string = TaxonomyCategoryEnum.Person;
  casus: string = TaxonomyCategoryEnum.Case;
  gradus: string = TaxonomyCategoryEnum.Degree;
  genus2:string = TaxonomyCategoryEnum.Voice;
  constructor(private searchService: SearchService) {
    super();
  }

  async ngOnInit() {

    this.searchService.getAllTaxonomyItems().then((items: TaxonomyViewModel[])=>{
      this.categoryItems = items;
    });

    this.searchService.currentQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
      if(this.query && this.query.formAttrs){
        this.categorySelector.setValue(this.query.formAttrs);
      }
    });

    this.categorySelector.valueChanges.subscribe((values : string[])=>{
      if(this.query){
        if(values.length == 0){
          this.query.formAttrs.forEach(v=>{
            if(this.categoryItems.map(i=>i.code).indexOf(v) > 0){
              delete this.query.formAttrs[v];
            }
          });
        }else{
          this.query.formAttrs = values;
        }
      }
    });
  }

  getCategoryItems(category: string) : TaxonomyViewModel[]{
    if(this.categoryItems){
      return this.categoryItems.filter(i=>i.categoryCode == category);
    }
    
  }

  select(attributes: string[]){
    let test = attributes;
  }

}
