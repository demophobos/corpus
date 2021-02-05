import { AppType } from '@shared/constants';
import { HeaderModel } from './headerModel';

export class HeaderView extends HeaderModel {
    apiType: string = AppType.HeaderView;
    projectDesc : string;
    projectCode : string;
    
    public constructor(fields: Partial<HeaderView>) {
        super(fields);
        Object.assign(this, fields);
     }
}