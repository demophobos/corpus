import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class Element extends Model {
    apiType: string = AppType.Element;
    value: string;
    chunkId: string;
    order:number;
    type:number;
    morphId:string;
    headerId:string;

    public constructor(fields: Partial<Element>) {
        super();
        Object.assign(this, fields);
     }
}