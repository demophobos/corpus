import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class Index extends Model {
    apiType: string = AppType.Index;
    headerId: string;
    name: string;
    order: number;
    parentId?: string;
    
    public constructor(fields: Partial<Index>) {
        super();
        Object.assign(this, fields);
     }
}