import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkQuery, HeaderModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-condition-panel',
  templateUrl: './condition-panel.component.html',
  styleUrls: ['./condition-panel.component.scss']
})
export class ConditionPanelComponent extends BaseComponent implements OnInit {
  query: ChunkQuery;
  morphItems: string[];
  workItems: HeaderModel[];
  formType: string;
  searchLemma:boolean = false;
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.searchService.chunkQuery.pipe(takeUntil(this.destroyed)).subscribe(query=>{
      this.query = query;
      
    });

    this.searchService.searchLemma.pipe(takeUntil(this.destroyed)).subscribe(searchLemma=>{
      this.searchLemma = searchLemma;
      if(searchLemma){
        this.formType = "Lemma";
      }else{
        this.formType = "Form";
      }
    });

    this.searchService.selectedAttributes.pipe(takeUntil(this.destroyed)).subscribe(items=>{
      this.morphItems = items;
    });

    this.searchService.selectedWorks.pipe(takeUntil(this.destroyed)).subscribe(items=>{
      this.workItems = items;
    });
  }

  removeMorphItem(item){
    this.morphItems = this.morphItems.filter(i=> i !== item);
    this.query.pos = this.query.pos.filter(i=> i !== item);
    this.query.case = this.query.case.filter(i=> i !== item);
    this.query.degree = this.query.degree.filter(i=> i !== item);
    this.query.gender = this.query.gender.filter(i=> i !== item);
    this.query.mood = this.query.mood.filter(i=> i !== item);
    this.query.number = this.query.number.filter(i=> i !== item);
    this.query.person = this.query.person.filter(i=> i !== item);
    this.query.tense = this.query.tense.filter(i=> i !== item);
    this.query.voice = this.query.voice.filter(i=> i !== item);
    this.searchService.chunkQuery.next(this.query);
    this.searchService.setSelectedMorphAttrubutes(this.query);
  }

  removeWorkItem(item: HeaderModel){
    this.workItems = this.workItems.filter(i=> i.id !== item.id);
    this.query.headers = this.query.headers.filter(i=>i !== item.id)
    this.searchService.chunkQuery.next(this.query);
    this.searchService.selectedWorks.next(this.workItems);
  }
}
