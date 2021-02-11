import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class ChunkModel extends Model {
    apiType: string = AppType.Chunk;
    indexId: string;
    value: string;
    valueObj: string;
    public constructor(fields: Partial<ChunkModel>) {
        super();
        Object.assign(this, fields);
     }
}