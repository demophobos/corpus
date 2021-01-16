import { AppType } from '@shared/constants';
import { Chunk } from './chunk';

export class ChunkView extends Chunk {
    apiType: string = AppType.ChunkView;
    indexName : string;
    headerDesc : string;
    indexOrder : number;
    headerId : string;
    projectDesc : string;
    projectCode : string;
    headerCode : string;
    headerLang : string;
    headerEditionType : string;
    projectId : string;
    
    public constructor(fields: Partial<ChunkView>) {
        super(fields);
        Object.assign(this, fields);
     }
}