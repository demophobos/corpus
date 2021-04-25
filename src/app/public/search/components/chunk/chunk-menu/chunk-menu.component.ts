import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '@shared/enums';
import { ChunkView } from '@shared/models';

@Component({
  selector: 'app-chunk-menu',
  templateUrl: './chunk-menu.component.html',
  styleUrls: ['./chunk-menu.component.scss']
})
export class ChunkMenuComponent implements OnInit {

  @Input() chunk: ChunkView;
  @Output('showHideVersio') showInterp: EventEmitter<any> = new EventEmitter();
  @Output('copyChunk') onCopyChunk: EventEmitter<any> = new EventEmitter();
  @Output('showHideContext') showHideContext: EventEmitter<any> = new EventEmitter();
  worksVisible: boolean = true;
  interpIcon: string;

  constructor(private router: Router) { 
    this.worksVisible = this.router.url !== "/index";
  }

  ngOnInit(): void {
    this.interpIcon = this.chunk.headerLang == Language.Latin ? Language.Russian : Language.Latin;
  }

  showHideVersio(){
    this.showInterp.emit();
  }

  showHideText(){
    this.showHideContext.emit();
  }
  copyChunk(){
    this.onCopyChunk.emit();
  }
}
