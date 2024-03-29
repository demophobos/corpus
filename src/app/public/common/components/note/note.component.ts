import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { ChunkNoteItem, NoteLinkModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';
import { linq } from '@shared/helpers';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent extends BaseComponent implements OnInit {
  chunkNotes: ChunkNoteItem[];
  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit() {
    if(this.searchService.currentChunk.value){
      this.chunkNotes = [];
      this.searchService.noteLinks.subscribe((links: NoteLinkModel[]) => {
        if (links.length > 0) {
          const noteGroup = groupBy('noteId');
          let groupped = noteGroup(links);
          Object.keys(groupped).forEach((id: any) => {
            this.chunkNotes.push(
              new ChunkNoteItem({
                noteId: id,
                elements: groupped[id].map((i: any) =>
                this.searchService.currentChunk.value.elements.find((j: any) => j._id == i.itemId)
                ),
              })
            );
          });
        }
      });
    }
  }
}

const groupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
