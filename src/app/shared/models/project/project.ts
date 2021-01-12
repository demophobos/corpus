import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class Project extends Model {
    apiType: string = AppType.Project;
    name: string;
    desc: string;

    public constructor(fields: Partial<Project>) {
        super();
        Object.assign(this, fields);
     }
}