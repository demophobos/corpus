import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class TaxonomyViewModel extends Model {
    apiType: string = AppType.Taxonomy;
    code: string;
    desc: string;
    parentId: string;
    categoryId: string;
    categoryCode: string;
    categoryDesc: string;

    public constructor(fields: Partial<TaxonomyViewModel>) {
        super();
        Object.assign(this, fields);
     }
}