import { ChunkView } from "./chunkView";
import { ElementView } from "./elementView";


export class ChunkElementView extends ChunkView {
    elements : ElementView[];
    
    public constructor(fields: Partial<ChunkElementView>) {
        super(fields);
        Object.assign(this, fields);
     }
}