import { IndexModel } from './project/indexModel';

export class IndexTreeNode extends IndexModel {
    children: IndexTreeNode[];
    public constructor(fields: Partial<IndexTreeNode>) {
        super(fields);
        Object.assign(this, fields);
    }
}