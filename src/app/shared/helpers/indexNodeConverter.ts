import { IndexModel, IndexTreeNode } from '@shared/models';

export class IndexNodeConverter {
  static convertIndexTreeNodeToIndex(indexTreeNode: IndexTreeNode): IndexModel {
    let index: IndexModel = indexTreeNode as IndexModel;
    delete indexTreeNode.children;
    return index;
  }
}
