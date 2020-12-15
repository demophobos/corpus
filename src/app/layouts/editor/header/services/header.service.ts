import { Injectable } from '@angular/core';
import { ApiService, AuthService } from '@core/services';
import { AppConfig } from '@shared/constants';
import { Header, User } from '@shared/models';
import { DialogService } from '@shared/services';
import { HeaderEditorComponent } from '../components/header-editor/header-editor.component';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private user: User;
  constructor(
    private readonly dialogService: DialogService,
    private readonly apiService: ApiService<Header>,
    private readonly authService: AuthService
  ) {
    this.authService.user$.subscribe((user: User) => {
      this.user = user;
    });
  }

  async showEditorDialog(header: Header): Promise<Header> {
    return this.dialogService
      .showComponent(
        HeaderEditorComponent,
        header,
        AppConfig.DefaultDialogWidth
      )
      .toPromise()
      .then((header: Header) => {
        if (header) {
          return header;
        }
      });
  }

  async createHeader(header: Header): Promise<Header> {
    header.creatorId = this.user.id;
    header.created = new Date();
    return await this.apiService
      .save(header)
      .toPromise()
      .then((header: Header) => {
        return header;
      });
  }

  async updateHeader(header: Header): Promise<Header> {
    header.modifierId = this.user.id;
    header.modified = new Date();
    return await this.apiService
      .save(header)
      .toPromise()
      .then((header: Header) => {
        return header;
      });
  }

  async deleteHeader(header: Header): Promise<Header> {
    return await this.dialogService
      .confirm(header.name, 'Are you sure?')
      .toPromise()
      .then((confirmed) => {
        if (confirmed) {
          return this.apiService
            .remove(header)
            .toPromise()
            .then((header: Header) => {
              return header;
            });
        }
      });
  }

  async getHeaders(projectId: string): Promise<Header[]> {
    return await this.apiService
      .findByQuery(new Header({}), JSON.stringify({ projectId: projectId }))
      .toPromise()
      .then((headers: Header[]) => {
        return headers;
      });
  }
}
