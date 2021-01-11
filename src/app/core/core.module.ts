import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromCoreServices from './services';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ...fromCoreServices.coreServices, 
    HttpClientModule
  ]
})
export class CoreModule { }
