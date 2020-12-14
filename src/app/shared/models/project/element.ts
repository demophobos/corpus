import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class Element extends Model {
    type: string = AppType.Chunk;
    chunkId: string;
    value: string;
    order: number;
    elementType: number;

    public constructor(fields: Partial<Element>) {
        super();
        Object.assign(this, fields);
     }
}