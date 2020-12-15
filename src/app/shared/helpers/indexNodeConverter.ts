import { Index, IndexTreeNode } from '@shared/models';

export class IndexNodeConverter {
  static convertIndexTreeNodeToIndex(indexTreeNode: IndexTreeNode): Index {
    let index: Index = indexTreeNode as Index;
    delete indexTreeNode.children;
    return index;
  }
}
