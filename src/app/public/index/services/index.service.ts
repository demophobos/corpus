import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import {
  ChunkView,
  HeaderView,
  IndexModel,
  IndexTreeNode,
  PageResponse,
} from '@shared/models';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

export interface ProjectGroup {
  code: string;
  headers: HeaderView[];
}
export interface IndexTreeItem {
  id: string;
  parentId: string;
  name: string;
  order: number;
  indexItems?: IndexTreeItem[];
}
@Injectable({
  providedIn: 'root',
})
export class IndexService {
  public showHideVersion: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public selectedHeader = new BehaviorSubject<HeaderView>(undefined);
  public selectedIndeces = new BehaviorSubject<IndexModel[]>(undefined);
  public selectedIndex = new BehaviorSubject<string>(undefined);
  public selectedChunk = new BehaviorSubject<ChunkView>(undefined);
  public currentIndexTreeItems = new BehaviorSubject<IndexTreeItem[]>(
    undefined
  );
  constructor(
    private indexApiService: ApiService<IndexModel>,
    private chunkApiService: ApiService<ChunkView>
  ) {}

  public async getIndeces(headerId: string): Promise<IndexModel[]> {
    return await this.indexApiService
      .findByQuery(new IndexModel({}), JSON.stringify({ headerId: headerId }))
      .toPromise()
      .then((result) => {
        this.selectedIndeces.next(result);
        return Promise.resolve(result);
      });
  }
  public flatIndexTreeItems: IndexTreeItem[] = [];
  public getFlatIndexTreeItems(items: IndexTreeItem[]) {
    items.forEach((item:IndexTreeItem) => {
      this.flatIndexTreeItems.push(item);
      if(item.indexItems && item.indexItems.length){
        this.getFlatIndexTreeItems(item.indexItems);
      }
    });
  }

  public async getIndexTree(headerId: string): Promise<IndexTreeItem[]> {
    return await this.indexApiService
      .findByQuery(new IndexModel({}), JSON.stringify({ headerId: headerId }))
      .toPromise()
      .then((result: IndexModel[]) => {
        var parents = result
          .filter((i) => i.parentId == undefined)
          .sort((a, b) => (a.order > b.order ? 1 : -1));

        var indexTreeItems: IndexTreeItem[] = [];

        parents.forEach((parent: IndexModel) => {
          var indexTreeItem: IndexTreeItem = this.CreateIndexTreeItem(parent);
          this.populateTree(indexTreeItem, result);
          indexTreeItems.push(indexTreeItem);
        });
        this.currentIndexTreeItems.next(indexTreeItems);
        return Promise.resolve(indexTreeItems);
      });
  }

  private CreateIndexTreeItem(parent: IndexModel): IndexTreeItem {
    return {
      id: parent.id,
      name: parent.name,
      order: parent.order,
      parentId: parent.parentId,
      indexItems: [],
    };
  }

  private populateTree(parent: IndexTreeItem, indeces: IndexModel[]) {
    var children = indeces
      .filter((i) => i.parentId == parent.id)
      .sort((a, b) => (a.order > b.order ? 1 : -1));
    if (children.length > 0) {
      children.forEach((item: IndexModel) => {
        var indexTreeItem: IndexTreeItem = this.CreateIndexTreeItem(item);
        this.populateTree(indexTreeItem, indeces);
        parent.indexItems.push(indexTreeItem);
      });
    }
  }

  public async getChunk(indexId: string): Promise<ChunkView> {
    return await this.chunkApiService
      .findPageByQuery(new ChunkView({}), JSON.stringify({ indexId: indexId }))
      .toPromise()
      .then((result: PageResponse) => {
        this.selectedChunk.next(result.documents[0]);
        return Promise.resolve(result.documents[0]);
      });
  }
}
