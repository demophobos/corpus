import {  } from './project/indexModel';
import { TaxonomyViewModel } from './project/taxonomyViewModel';

export class TaxonomyTreeNode extends TaxonomyViewModel {
    children: TaxonomyTreeNode[];
    expandable: boolean;
    public constructor(fields: Partial<TaxonomyTreeNode>) {
        super(fields);
        Object.assign(this, fields);
    }
}