import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class HeaderModel extends Model {
    apiType: string = AppType.Header;
    code: string;
    name: string;
    desc: string;
    projectId:string;
    lang: string;
    editionType: string;
    
    public constructor(fields: Partial<HeaderModel>) {
        super();
        Object.assign(this, fields);
     }
}