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
    });
  }

  getCategoryTitle(category: string) : string {
    if(this.categoryItems){
      return this.categoryItems.filter(i=>i.categoryCode == category).map(i=>i.categoryDesc)[0];
    }
  }

  getCategoryItems(category: string) : TaxonomyViewModel[]{
    if(this.categoryItems){
      return this.categoryItems.filter(i=>i.categoryCode == category);
    }
  }

  posSelected(selected){
    if(this.query){
      this.query.pos = selected;
    }
  }
  tempusSelected(selected){
    if(this.query){
      this.query.tense = selected;
    }
  }
  modusSelected(selected){
    if(this.query){
      this.query.mood = selected;
    }
  }
  genusSelected(selected){
    if(this.query){
      this.query.gender = selected;
    }
  }
  numerusSelected(selected){
    if(this.query){
      this.query.number = selected;
    }
  }
  personaSelected(selected){
    if(this.query){
      this.query.person = selected;
    }
  }
  casusSelected(selected){
    if(this.query){
      this.query.case = selected;
    }
  }
  gradusSelected(selected){
    if(this.query){
      this.query.degree = selected;
    }
  }
  genus2Selected(selected){
    if(this.query){
      this.query.voice = selected;
    }
  }

}
