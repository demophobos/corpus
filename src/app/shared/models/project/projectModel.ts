import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class ProjectModel extends Model {
    apiType: string = AppType.Project;
    id:string;
    code: string;
    desc: string;

    public constructor(fields: Partial<ProjectModel>) {
        super();
        Object.assign(this, fields);
     }
}