import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { TaxonomyCategoryEnum } from '@shared/enums/taxonomy-category-enum';
import { ChunkQuery, TaxonomyViewModel } from '@shared/models';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-morph-condition',
  templateUrl: './morph-condition.component.html',
  styleUrls: ['./morph-condition.component.scss']
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

    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
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

  getSelected(cat: string){
    if(cat == TaxonomyCategoryEnum.Pos){
      return this.query.pos.length;
    }
    if(cat == TaxonomyCategoryEnum.Tense){
      return this.query.tense.length;
    }
    if(cat == TaxonomyCategoryEnum.Case){
      return this.query.case.length;
    }
    if(cat == TaxonomyCategoryEnum.Degree){
      return this.query.degree.length;
    }
    if(cat == TaxonomyCategoryEnum.Gender){
      return this.query.gender.length;
    }
    if(cat == TaxonomyCategoryEnum.Mood){
      return this.query.mood.length;
    }
    if(cat == TaxonomyCategoryEnum.Number){
      return this.query.number.length;
    }
    if(cat == TaxonomyCategoryEnum.Person){
      return this.query.person.length;
    }
    if(cat == TaxonomyCategoryEnum.Voice){
      return this.query.voice.length;
    }
  }

  posSelected(selected){
    if(this.query){
      this.query.pos = selected;
      this.searchService.setSelectedMorphAttrubutes(this.query);
    }
  }
  tempusSelected(selected){
    if(this.query){
      this.query.tense = selected;
      this.searchService.setSelectedMorphAttrubutes(this.query);
    }
  }
  modusSelected(selected){
    if(this.query){
      this.query.mood = selected;
      this.searchService.setSelectedMorphAttrubutes(this.query);
    }
  }
  genusSelected(selected){
    if(this.query){
      this.query.gender = selected;
      this.searchService.setSelectedMorphAttrubutes(this.query);
    }
  }
  numerusSelected(selected){
    if(this.query){
      this.query.number = selected;
      this.searchService.setSelectedMorphAttrubutes(this.query);
    }
  }
  personaSelected(selected){
    if(this.query){
      this.query.person = selected;
      this.searchService.setSelectedMorphAttrubutes(this.query);
    }
  }
  casusSelected(selected){
    if(this.query){
      this.query.case = selected;
      this.searchService.setSelectedMorphAttrubutes(this.query);
    }
  }
  gradusSelected(selected){
    if(this.query){
      this.query.degree = selected;
      this.searchService.setSelectedMorphAttrubutes(this.query);
    }
  }
  genus2Selected(selected){
    if(this.query){
      this.query.voice = selected;
      this.searchService.setSelectedMorphAttrubutes(this.query);
    }
  }

}
