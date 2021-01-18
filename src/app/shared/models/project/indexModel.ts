import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class IndexModel extends Model {
    apiType: string = AppType.Index;
    headerId: string;
    name: string;
    order: number;
    parentId?: string;
    
    public constructor(fields: Partial<IndexModel>) {
        super();
        Object.assign(this, fields);
     }
}