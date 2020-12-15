import { Injectable } from '@angular/core';
import { ApiService, AuthService } from '@core/services';
import { AppConfig } from '@shared/constants';
import { IndexNodeConverter } from '@shared/helpers';
import { Index, IndexTreeNode, User } from '@shared/models';
import { DialogService } from '@shared/services';
import { IndexEditorComponent } from '../components/index-editor/index-editor.component';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  private user: User;

  constructor(
    private readonly dialogService: DialogService,
    private readonly apiService: ApiService<Index>,
    private readonly authService: AuthService
  ) {
    this.authService.user$.subscribe((user: User) => {
      this.user = user;
    });
  }

  async showEditorDialog(index: Index): Promise<Index> {
    return this.dialogService
      .showComponent(IndexEditorComponent, index, AppConfig.DefaultDialogWidth)
      .toPromise()
      .then((index: Index) => {
        if (index) {
          return index;
        }
      });
  }

  async createIndex(index: Index): Promise<Index> {
    index.creatorId = this.user.id;
    index.created = new Date();
    return await this.apiService
      .save(index)
      .toPromise()
      .then((index: Index) => {
        return index;
      });
  }

  async updateIndex(index: Index): Promise<Index> {
    index.modifierId = this.user.id;
    index.modified = new Date();
    return await this.apiService
      .save(index)
      .toPromise()
      .then((index: Index) => {
        return index;
      });
  }
  //TODO: move logic to backend
  deleteIndexNode(indexTreeNode: IndexTreeNode) {
    indexTreeNode.children.forEach((i) => {
      if (i.children.length > 0) {
        this.deleteIndexNode(i);
      } else {
        let index = IndexNodeConverter.convertIndexTreeNodeToIndex(i);
        this.apiService
          .remove(index)
          .toPromise()
          .then((index: Index) => {
            return index;
          });
      }
    });

    let index = IndexNodeConverter.convertIndexTreeNodeToIndex(indexTreeNode);
    this.apiService
      .remove(index)
      .toPromise()
      .then((index: Index) => {
        return index;
      });
  }

  async getDocumentContent(headerId: string): Promise<IndexTreeNode[]> {
    return await this.apiService
      .findByQuery(new Index({}), JSON.stringify({ headerId: headerId }))
      .toPromise()
      .then((res: Index[]) => {
        let top = res
          .filter((i) => i.parentId == undefined)
          .sort((i) => i.order);
        let tnd: IndexTreeNode[] = new Array<IndexTreeNode>();
        top.forEach((i) => {
          let root = this.createIndexTreeNode(i);
          tnd.push(root);
          this.populateTree(root, res);
        });
        return tnd;
      });
  }

  private createIndexTreeNode(i: Index): IndexTreeNode {
    return new IndexTreeNode({
      headerId: i.headerId,
      id: i.id,
      name: i.name,
      order: i.order,
      type: i.type,
      created: i.created,
      creatorId: i.creatorId,
      modified: i.modified,
      modifierId: i.modifierId,
      parentId: i.parentId,
      children: new Array<IndexTreeNode>(),
    });
  }

  private populateTree(indexTreeNode: IndexTreeNode, indeces: Index[]) {
    let children = indeces.filter((i) => i.parentId == indexTreeNode.id);
    children.forEach((i) => {
      let child = this.createIndexTreeNode(i);
      indexTreeNode.children.push(child);
      this.populateTree(child, indeces);
    });
  }
}
