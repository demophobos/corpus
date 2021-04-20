import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkView } from '@shared/models';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-chunk-info',
  templateUrl: './chunk-info.component.html',
  styleUrls: ['./chunk-info.component.scss']
})
export class ChunkInfoComponent extends BaseComponent implements OnInit {
  @Input() chunk: ChunkView;
  constructor(private searchService: SearchService, private deviceService: DeviceDetectorService) {
    super(deviceService);
  }

  ngOnInit(): void {

  }
  getInfo(chunk: ChunkView) {
    this.searchService.setCommentable = chunk;
  }
}
