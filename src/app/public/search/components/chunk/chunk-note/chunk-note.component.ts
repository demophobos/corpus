import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { linq } from '@shared/helpers';
import { ChunkNoteItem, ChunkView, NoteLinkModel } from '@shared/models';
import { SearchService } from 'app/public/search/services/search.service';

@Component({
  selector: 'app-chunk-note',
  templateUrl: './chunk-note.component.html',
  styleUrls: ['./chunk-note.component.scss'],
})
export class ChunkNoteComponent extends BaseComponent implements OnInit {
  @Input() chunk: ChunkView;
  chunkNotes: ChunkNoteItem[];
  constructor(private searchService: SearchService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    if(this.chunk){
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
                  this.chunk.elements.find((j: any) => j._id == i.itemId)
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
