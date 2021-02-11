import { AppType } from '@shared/constants';
import { ChunkModel } from './chunkModel';
import { ChunkValueItemModel } from './chunkValueObjModel';

export class ChunkView extends ChunkModel {
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
    elements: ChunkValueItemModel[]


    public constructor(fields: Partial<ChunkView>) {
        super(fields);
        Object.assign(this, fields);
     }
}