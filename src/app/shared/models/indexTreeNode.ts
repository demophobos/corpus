import { Index } from './project';

export class IndexTreeNode extends Index {
    children: IndexTreeNode[];
    public constructor(fields: Partial<IndexTreeNode>) {
        super(fields);
        Object.assign(this, fields);
    }
}