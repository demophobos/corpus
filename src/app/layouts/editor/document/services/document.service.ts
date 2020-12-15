import { Injectable, OnInit } from '@angular/core';
import { ApiService } from '@core/services';
import { Header, Index, Project, IndexTreeNode} from '@shared/models';
import { DialogService } from '@shared/services';
import { ReplaySubject } from 'rxjs';
import { ProjectService } from '../../project/services/project.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentService implements OnInit {
  private project: Project;

  private headersData = new ReplaySubject<Header[]>(1);
  headers$: ReplaySubject<Header[]> = this.headersData;

  private contentData = new ReplaySubject<IndexTreeNode[]>(1);
  content$: ReplaySubject<IndexTreeNode[]> = this.contentData;

  private selectedHeaderData = new ReplaySubject<Header>();
  selectedHeader$: ReplaySubject<Header> = this.selectedHeaderData;

  constructor(
    private readonly headerApiService: ApiService<Header>,
    private readonly indexApiService: ApiService<Index>,
    private readonly projectService: ProjectService,
    private readonly dialogService: DialogService
  ) {
    this.projectService.selectedProject$.subscribe((item) => {
      this.clearDocumentData();
      this.project = item;
      this.getDocumentHeaders(this.project.id);
    });
  }
  ngOnInit(): void {}

  //#region COMMON
  private clearDocumentData() {
    this.headersData.next(new Array<Header>());
    this.contentData.next(new Array<IndexTreeNode>());
    this.selectedHeaderData.next(undefined);
    //this.selectedChunkData.next(undefined);
  }
  //#endregion

  //#region HEADER
  public saveHeader(header: Header) {
    if (header.id) {
      this.updateHeader(header);
    } else {
      this.createHeader(header);
    }
  }

  private createHeader(header: Header) {
    header.creatorId = this.projectService.user$.id;
    header.created = new Date();
    this.headerApiService
      .save(header)
      .toPromise()
      .then(() => {
        this.getDocumentHeaders(header.projectId);
        Promise.resolve();
      });
  }

  private updateHeader(header: Header) {
    header.modifierId = this.projectService.user$.id;
    header.modified = new Date();
    this.headerApiService
      .save(header)
      .toPromise()
      .then(() => {
        this.getDocumentHeaders(header.projectId);
        Promise.resolve();
      });
  }

  public deleteHeader(header: Header) {
    this.headerApiService
      .remove(header)
      .toPromise()
      .then(() => {
        this.clearDocumentData();
        this.getDocumentHeaders(header.projectId);
        Promise.resolve();
      });
  }

  private getDocumentHeaders(projectId: string) {
    this.headerApiService
      .findByQuery(new Header({}), JSON.stringify({ projectId: projectId }))
      .toPromise()
      .then((value) => this.headersData.next(value));
  }

  public selectDocumentHeader(header: Header) {
    this.selectedHeaderData.next(header);
    if (header.id) {
      this.buildDocumentContent(header.id);
    } else {
      this.contentData.next(new Array<IndexTreeNode>());
    }
  }
  //#endregion

  //#region INDEX

  /**
   * Saves index
   * @param index
   */
  public saveIndex(index: Index) {
    if (index.id) {
      this.updateIndex(index);
    } else {
      this.createIndex(index);
    }
  }

  /**
   * Deletes index node
   * @param indexTreeNode
   */
  //TODO: Move logic to backend
  public deleteIndexNode(indexTreeNode: IndexTreeNode) {
    indexTreeNode.children.forEach((i) => {
      if (i.children.length > 0) {
        this.deleteIndexNode(i);
      } else {
        let index = this.convertIndexTreeNodeToIndex(i);
        this.indexApiService
          .remove(index)
          .toPromise()
          .then(() => {
            Promise.resolve();
          });
      }
    });
    let index = this.convertIndexTreeNodeToIndex(indexTreeNode);
    this.indexApiService
      .remove(index)
      .toPromise()
      .then(() => {
        this.buildDocumentContent(index.headerId);
        Promise.resolve();
      });
  }

  /**
   * Creates index
   * @param index
   */
  private createIndex(index: Index) {
    index.creatorId = this.projectService.user$.id;
    index.created = new Date();
    this.indexApiService
      .save(index)
      .toPromise()
      .then(() => {
        this.buildDocumentContent(index.headerId);
        Promise.resolve();
      });
  }

  /**
   * Updates index
   * @param index
   */
  private updateIndex(index: Index) {
    index.modifierId = this.projectService.user$.id;
    index.modified = new Date();
    this.indexApiService
      .save(index)
      .toPromise()
      .then(() => {
        this.buildDocumentContent(index.headerId);
        Promise.resolve();
      });
  }

  /**
   * Builds document content
   * @param headerId
   */
  private buildDocumentContent(headerId: string) {
    this.indexApiService
      .findByQuery(new Index({}), JSON.stringify({ headerId: headerId }))
      .toPromise()
      .then((res: Index[]) => {
        let top = res
          .filter((i) => i.parentId == undefined)
          .sort((i) => i.order);
        let tnd = new Array<IndexTreeNode>();
        top.forEach((i) => {
          let root = this.createIndexTreeNode(i);
          tnd.push(root);
          this.populateTree(root, res);
        });
        this.contentData.next(tnd);
      });
  }

  /**
   * Creates content node
   * @param i
   * @returns IndexTreeNode
   */
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

  /**
   * Populates tree
   * @param indexTreeNode
   * @param indeces
   */
  private populateTree(indexTreeNode: IndexTreeNode, indeces: Index[]) {
    let children = indeces.filter((i) => i.parentId == indexTreeNode.id);
    children.forEach((i) => {
      let child = this.createIndexTreeNode(i);
      indexTreeNode.children.push(child);
      this.populateTree(child, indeces);
    });
  }

  /**
   * Converts index node to index
   * @param indexTreeNode
   * @returns Index
   */
  public convertIndexTreeNodeToIndex(indexTreeNode: IndexTreeNode): Index {
    let index: Index = indexTreeNode as Index;
    delete indexTreeNode.children;
    return index;
  }

  //#endregion
}
