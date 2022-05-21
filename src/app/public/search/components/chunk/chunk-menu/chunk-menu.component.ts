import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Language } from '@shared/enums';
import { ChunkView } from '@shared/models';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-chunk-menu',
  templateUrl: './chunk-menu.component.html',
  styleUrls: ['./chunk-menu.component.scss']
})
export class ChunkMenuComponent implements OnInit {

  @Input() chunk: ChunkView;
  @Input() versioVisible: boolean = true;
  @Output('showHideVersio') onShowHideVersion: EventEmitter<any> = new EventEmitter();
  @Output('showHideNotes') onShowHideNotes: EventEmitter<any> = new EventEmitter();
  @Output('showHideMorph') onShowHideMorph: EventEmitter<any> = new EventEmitter();
  worksVisible: boolean = true;

  constructor(private router: Router, private clipboard: Clipboard,
    private snackBar: MatSnackBar) { 
    this.worksVisible = this.router.url !== "/index";
  }

  ngOnInit(): void {
    
  }

  showHideVersio(){
    this.onShowHideVersion.emit();
  }

  showHideMorph(){
    this.onShowHideMorph.emit();
  }

  copyChunk(){
    let chunkCopy = `[${this.chunk.indexName}] ${this.chunk.value} [${this.chunk.headerCode}]`;
    this.clipboard.copy(chunkCopy);
    this.snackBar.open(
      `Exemplar fragmenti [${this.chunk.headerCode}, ${this.chunk.indexName}] factum'st`,
      'Claudere',
      {
        duration: 3000,
      }
    );
  }

  showHideNotes(){
    this.onShowHideNotes.emit();
  }
}
