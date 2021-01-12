import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromCoreServices from './services';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    ...fromCoreServices.coreServices, 
    HttpClientModule
  ]
})
export class CoreModule { }
