import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from '@shared/enums';
import { ChunkElementView } from '@shared/models';

@Component({
  selector: 'app-chunk-menu',
  templateUrl: './chunk-menu.component.html',
  styleUrls: ['./chunk-menu.component.scss']
})
export class ChunkMenuComponent implements OnInit {

  @Input() chunk: ChunkElementView;
  @Output() showInterp: EventEmitter<any> = new EventEmitter();
  interpIcon: string;
  interpInfo: string;

  constructor() { }

  ngOnInit(): void {
    this.interpIcon = this.chunk.headerLang == Language.Latin ? Language.Russian : Language.Latin;
    this.interpInfo = 'Versio';
  }

  loadInterp(){
    this.showInterp.emit();
  }
}
