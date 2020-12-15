import { EventEmitter, Injectable } from '@angular/core';
import { EventEnum } from '@shared/enums';
import { IndexNodeConverter } from '@shared/helpers';
import { Chunk, Header, Index, Project } from '@shared/models';
import { ChunkService } from './chunk/services/chunk.service';
import { ElementService } from './element/services/element.service';
import { HeaderService } from './header/services/header.service';
import { IndexService } from './index/services/index.service';
import { ProjectService } from './project/services/project.service';

@Injectable({
  providedIn: 'root',
})
export class EditorEventService {
  PROJECTS_LOADED = new EventEmitter<Project[]>();
  PROJECT_CREATED = new EventEmitter<Project>();
  PROJECT_UPDATED = new EventEmitter<Project>();
  PROJECT_DELETED = new EventEmitter<Project>();
  PROJECT_SELECTED = new EventEmitter<Project>();

  HEADERS_LOADED = new EventEmitter<Header[]>();
  HEADER_CREATED = new EventEmitter<Header>();
  HEADER_UPDATED = new EventEmitter<Header>();
  HEADER_DELETED = new EventEmitter<Header>();
  HEADER_SELECTED = new EventEmitter<Header>();

  INDECES_LOADED = new EventEmitter<Index[]>();
  INDEX_CREATED = new EventEmitter<Index>();
  INDEX_UPDATED = new EventEmitter<Index>();
  INDEX_DELETED = new EventEmitter<Index>();
  INDEX_SELECTED = new EventEmitter<Index>();

  CHUNK_CREATED = new EventEmitter<Chunk>();
  CHUNK_UPDATED = new EventEmitter<Chunk>();
  CHUNK_DELETED = new EventEmitter<Chunk>();
  CHUNK_SELECTED = new EventEmitter<Chunk>();

  constructor(
    private projectService: ProjectService,
    private chunkService: ChunkService,
    private indexService: IndexService,
    private headerService: HeaderService,
    private elementService: ElementService
  ) {}

  public do(event: EventEnum, item?: any) {
    switch (event) {
      case EventEnum.PROJECTS_LOAD:
        this.projectService.getProjects().then((projects: Project[]) => {
          this.PROJECTS_LOADED.emit(projects);
        });
        break;
      case EventEnum.PROJECT_CREATE:
        this.projectService.showEditorDialog(item).then((project: Project) => {
          this.projectService
            .createProject(project)
            .then((project: Project) => {
              this.PROJECT_CREATED.emit(project);
            });
        });
        break;
      case EventEnum.PROJECT_UPDATE:
        this.projectService.showEditorDialog(item).then((project: Project) => {
          this.projectService
            .updateProject(project)
            .then((project: Project) => {
              this.PROJECT_UPDATED.emit(project);
            });
        });
        break;
      case EventEnum.PROJECT_DELETE:
        this.projectService.deleteProject(item).then((project: Project) => {
          if (project) {
            this.PROJECT_DELETED.emit(project);
          }
        });
        break;
      case EventEnum.PROJECT_SELECT:
        this.PROJECT_SELECTED.emit(item);
        this.do(EventEnum.HEADERS_LOAD, item.id);
        break;
      case EventEnum.HEADERS_LOAD:
        //item == projectId
        this.headerService.getHeaders(item).then((headers: Header[]) => {
          this.HEADERS_LOADED.emit(headers);
        });
        break;
      case EventEnum.HEADER_CREATE:
        this.headerService.showEditorDialog(item).then((header: Header) => {
          this.headerService.createHeader(header).then((header: Header) => {
            this.HEADER_CREATED.emit(header);
          });
        });
        break;
      case EventEnum.HEADER_UPDATE:
        this.headerService.showEditorDialog(item).then((header: Header) => {
          this.headerService.updateHeader(header).then((header: Header) => {
            this.HEADER_UPDATED.emit(header);
          });
        });
        break;
      case EventEnum.HEADER_DELETE:
        this.headerService.deleteHeader(item).then((header: Header) => {
          if (header) {
            this.HEADER_DELETED.emit(header);
          }
        });
        break;
      case EventEnum.HEADER_SELECT:
        this.HEADER_SELECTED.emit(item);
        this.do(EventEnum.INDECES_LOAD, item.id);
        break;
      case EventEnum.CHUNK_CREATE:
        this.chunkService.showEditorDialog(item).then((chunk: Chunk) => {
          this.chunkService.createChunk(chunk).then((chunk: Chunk) => {
            this.CHUNK_CREATED.emit(chunk);
          });
        });
        break;
      case EventEnum.CHUNK_UPDATE:
        this.chunkService.showEditorDialog(item).then((chunk: Chunk) => {
          this.chunkService.updateChunk(chunk).then((chunk: Chunk) => {
            this.CHUNK_UPDATED.emit(chunk);
          });
        });
        break;
      case EventEnum.CHUNK_DELETE:
        this.chunkService.deleteChunk(item).then((chunk: Chunk) => {
          if (chunk) {
            this.CHUNK_DELETED.emit(chunk);
          }
        });
        break;
      case EventEnum.CHUNK_SELECT:
        this.CHUNK_SELECTED.emit(item);
        break;
      case EventEnum.INDECES_LOAD:
        this.indexService.getDocumentContent(item).then((indeces: Index[]) => {
          this.INDECES_LOADED.emit(indeces);
        });
        break;
      case EventEnum.INDEX_CREATE:
        this.indexService.showEditorDialog(item).then((index: Index) => {
          this.indexService.createIndex(index).then((index: Index) => {
            this.INDEX_CREATED.emit(index);
          });
        });
        break;
      case EventEnum.INDEX_UPDATE:
        this.indexService.showEditorDialog(item).then((index: Index) => {
          this.indexService.updateIndex(index).then((index: Index) => {
            this.INDEX_UPDATED.emit(index);
          });
        });
        break;
      case EventEnum.INDEX_DELETE:
        this.indexService.deleteIndexNode(item);
        this.INDEX_DELETED.emit(item);
        break;
      case EventEnum.INDEX_SELECT:
        let index: Index = IndexNodeConverter.convertIndexTreeNodeToIndex(item);
        this.INDEX_SELECTED.emit(index);
        this.chunkService.getChunkByIndex(index.id).then((chunk) => {
          this.CHUNK_SELECTED.emit(chunk);
        });
        break;
    }
  }
}
