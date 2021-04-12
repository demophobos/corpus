import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  template: `
      <div>
          base works!!
      </div>
  `
})
export class BaseComponent implements OnDestroy {

  destroyed = new Subject();
  constructor() {

  }

  ngOnDestroy() {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

}
