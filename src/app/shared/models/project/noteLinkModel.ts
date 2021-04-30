import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class NoteLinkModel extends Model {
  apiType: string = AppType.NoteLink;
  target: number;
  headerId: string;
  indexId: string;
  itemId: string;
  noteId: string;

  public constructor(fields: Partial<NoteLinkModel>) {
    super();
    Object.assign(this, fields);
  }
}