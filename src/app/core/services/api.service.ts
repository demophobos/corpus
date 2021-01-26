import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

import { Model } from '@shared/models';
import { AppConfig } from '@shared/constants';
import { ModelMapperService } from '@shared/services/model-mapper.service';
import { ErrorService } from '@shared/services';

@Injectable()
export class ApiService<T extends Model> implements OnInit {
  private headers = new HttpHeaders();

  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  findAll(item: T) {
    return this.httpClient.get(`${AppConfig.ApiUrl}${item.apiType}`).pipe(
      map((res: any) => {
        return res.map((i: any) => ModelMapperService.Map(item, i));
      }),
      catchError((e: any) => throwError(this.errorService.errorHandler(e)))
    );
  }

  findOne(item: T) {
    return this.httpClient
      .get(`${AppConfig.ApiUrl}${item.apiType}/${item.id}`)
      .pipe(
        map((res) => {
          return ModelMapperService.Map(item, res);
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  findByQuery(item: T, query: string) {
    return this.httpClient
      .get(`${AppConfig.ApiUrl}${item.apiType}?params=${query}`)
      .pipe(
        map((res: any) => {
          return res.map((i: any) => ModelMapperService.Map(item, i));
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  findPageByQuery(item: T, query: string) {
    return this.httpClient
      .get(`${AppConfig.ApiUrl}${item.apiType}?params=${query}`)
      .pipe(
        map((res: any) => {
          return ModelMapperService.Map(item, res);
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  countByQuery(item: T, query: string) {
    return this.httpClient
      .get(`${AppConfig.ApiUrl}${item.apiType}?params=${query}`)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  remove(item: T) {
    return this.httpClient
      .delete(`${AppConfig.ApiUrl}${item.apiType}/${item.id}`, {
        headers: this.headers,
      })
      .pipe(
        map((res) => {
          return ModelMapperService.Map(item, res);
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }

  save(item: T) {
    if (item.id !== undefined) {
      return this.httpClient
        .put(`${AppConfig.ApiUrl}${item.apiType}/${item.id}`, item, {
          headers: this.headers,
        })
        .pipe(
          map((res) => {
            return ModelMapperService.Map(item, res);
          }),
          catchError((e: any) => throwError(this.errorService.errorHandler(e)))
        );
    } else {
      return this.httpClient
        .post(`${AppConfig.ApiUrl}${item.apiType}`, item, {
          headers: this.headers,
        })
        .pipe(
          map((res) => {
            return ModelMapperService.Map(item, res);
          }),
          catchError((e: any) => throwError(this.errorService.errorHandler(e)))
        );
    }
  }
  
  patch(item: T) {
    return this.httpClient
      .patch(`${AppConfig.ApiUrl}${item.apiType}/${item.id}`, item, {
        headers: this.headers,
      })
      .pipe(
        map((res) => {
          return ModelMapperService.Map(item, res);
        }),
        catchError((e: any) => throwError(this.errorService.errorHandler(e)))
      );
  }
}
