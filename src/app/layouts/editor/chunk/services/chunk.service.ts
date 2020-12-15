import { Injectable } from '@angular/core';
import { ApiService, AuthService } from '@core/services';
import { AppConfig } from '@shared/constants';
import { Chunk, User } from '@shared/models';
import { DialogService } from '@shared/services';
import { ChunkEditorComponent } from '../components/chunk-editor/chunk-editor.component';

@Injectable({
  providedIn: 'root'
})
export class ChunkService {
  private user: User;
  constructor(
    private readonly dialogService: DialogService, 
    private readonly chunkApiService: ApiService<Chunk>,
    private readonly authService: AuthService
    ) { 
      this.authService.user$.subscribe((user : User) => {
        this.user = user;
      });
    }

  async showChunkEditorDialog(chunk: Chunk) {
    return this.dialogService
      .showComponent(ChunkEditorComponent, chunk, AppConfig.DefaultDialogWidth)
      .toPromise()
      .then((chunk: Chunk) => {
        if (chunk) {
          return chunk;
        }
      });
  }

  async updateChunk(chunk: Chunk): Promise<Chunk> {
    chunk.modifierId = this.user.id;
    chunk.modified = new Date();
    return await this.chunkApiService
      .save(chunk)
      .toPromise()
      .then((chunk: Chunk) => {
        return chunk;
      });
  }



  async createChunk(chunk: Chunk): Promise<Chunk> {
    chunk.creatorId = this.user.id;
    chunk.created = new Date();
    return await this.chunkApiService
      .save(chunk)
      .toPromise()
      .then((chunk: Chunk) => {
        return chunk;
      });
  }

  async getChunkByIndex(indexId: string): Promise<Chunk> {
    return await this.chunkApiService
      .findByQuery(new Chunk({}), JSON.stringify({ indexId: indexId }))
      .toPromise()
      .then((chunk) => {
        return chunk[0];
      });
  }
  async deleteChunk(chunk: Chunk) {
    return await this.dialogService
      .confirm(chunk.value, 'Are you sure?')
      .toPromise()
      .then((confirmed) => {
        if (confirmed) {
          return this.chunkApiService
            .remove(chunk)
            .toPromise()
            .then((chunk) => {
              return chunk;
            });
        }
      });
  }
}
