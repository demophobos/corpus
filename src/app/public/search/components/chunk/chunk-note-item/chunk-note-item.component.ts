import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChunkNoteItem, NoteModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';

@Component({
  selector: 'app-chunk-note-item',
  templateUrl: './chunk-note-item.component.html',
  styleUrls: ['./chunk-note-item.component.scss']
})
export class ChunkNoteItemComponent implements OnInit {
  @Input() chunkNote: ChunkNoteItem;
  note: NoteModel;
  title: string;
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.chunkNote && changes.chunkNote.currentValue.noteId) {
      await this.searchService.getNote(changes.chunkNote.currentValue.noteId).then((item) =>{
        this.note = item;
        let words = this.chunkNote.elements.map(i=>i.value);
        this.title = words.join(' ');
      });
      this.title
    }
  }
}
