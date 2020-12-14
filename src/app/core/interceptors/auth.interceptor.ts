import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("token");

    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set("x-access-token", idToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(request);
    }
  }
}
