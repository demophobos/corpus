import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SearchService } from '../../../search/services/search.service';

@Component({
  selector: 'app-chunk-info',
  templateUrl: './chunk-info.component.html',
  styleUrls: ['./chunk-info.component.scss']
})
export class ChunkInfoComponent extends BaseComponent implements OnInit {
  @Input() index: string;
  @Input() code: string;
  @Input() desc: string;
  @Input() showHeaderCode: boolean = true;
  constructor(private searchService: SearchService, private deviceService: DeviceDetectorService) {
    super(deviceService);
  }

  ngOnInit(): void {

  }
}
