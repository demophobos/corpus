import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const APP_PREFIX = 'CLR-';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  valueChange = new Subject();

  setItem(key: string, value: any) {
      localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
      this.valueChange.next(value);
  }

  getItem(key: string) {
      return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
  }

  removeItem(key: string) {
      localStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
