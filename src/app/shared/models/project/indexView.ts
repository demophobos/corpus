import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class IndexView extends Model {
    apiType: string = AppType.IndexView;
    name: string;
    order: number;
    parentId?: string;
    headerId: string;
    projectId: string;
    projectCode: string;
    projectDesc: string;
    projectCreator: string;
    headerCode: string;
    headerEditionType: string;
    headerDesc: string;
    headerLang: string;
    projectCreated: Date;
    
    public constructor(fields: Partial<IndexView>) {
        super();
        Object.assign(this, fields);
     }
}