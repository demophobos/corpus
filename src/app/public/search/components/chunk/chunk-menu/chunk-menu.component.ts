import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from '@shared/enums';
import { ChunkView } from '@shared/models';

@Component({
  selector: 'app-chunk-menu',
  templateUrl: './chunk-menu.component.html',
  styleUrls: ['./chunk-menu.component.scss']
})
export class ChunkMenuComponent implements OnInit {

  @Input() chunk: ChunkView;
  @Output() showInterp: EventEmitter<any> = new EventEmitter();
  interpIcon: string;

  constructor() { }

  ngOnInit(): void {
    this.interpIcon = this.chunk.headerLang == Language.Latin ? Language.Russian : Language.Latin;
  }

  loadInterp(){
    this.showInterp.emit();
  }
}
