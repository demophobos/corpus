import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class InterpModel extends Model {
    apiType: string = AppType.Interp;
    sourceId : string;
    interpId : string;
    interpHeaderId : string; 
    sourceHeaderId : string;
    
    public constructor(fields: Partial<InterpModel>) {
        super();
        Object.assign(this, fields);
     }
}