import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class Chunk extends Model {
    type: string = AppType.Chunk;
    indexId: string;
    value: string;
    
    public constructor(fields: Partial<Chunk>) {
        super();
        Object.assign(this, fields);
     }
}