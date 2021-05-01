import { ChunkValueItemModel } from './chunkValueObjModel';

export class ChunkNoteItem {
    noteId : string;
    elements: ChunkValueItemModel[];
    
    public constructor(fields: Partial<ChunkNoteItem>) {
        Object.assign(this, fields);
     }
}