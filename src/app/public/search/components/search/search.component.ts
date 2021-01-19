import { Component, destroyPlatform, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '@shared/components';
import { AppConfig } from '@shared/constants';
import { FormSearchType } from '@shared/enums';
import { ElementQuery, ElementView } from '@shared/models';
import { DialogService } from '@shared/services';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { SearchOptionsComponent } from '../search-options/search-options.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends BaseComponent implements OnInit {


  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {

  }
}
