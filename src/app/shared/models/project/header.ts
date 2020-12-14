import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class Header extends Model {
    type: string = AppType.Header;
    code: string;
    name: string;
    desc: string;
    projectId:string;
    lang: string;
    editionType: string;
    
    public constructor(fields: Partial<Header>) {
        super();
        Object.assign(this, fields);
     }
}