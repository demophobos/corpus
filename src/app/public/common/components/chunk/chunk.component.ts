import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkView } from '@shared/models';

@Component({
  selector: 'app-chunk',
  templateUrl: './chunk.component.html',
  styleUrls: ['./chunk.component.scss']
})
export class ChunkComponent extends BaseComponent implements OnInit {
  @Input() chunk: ChunkView;
  @Input() isParallel: boolean = false;
  @Input() showHeaderCode: boolean = true;
  constructor() {
    super();
  }

  ngOnInit(): void {

  }
}
