import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class NoteModel extends Model {
  apiType: string = AppType.Note;
  headerId: string;
  value: string;
  type: number;

  public constructor(fields: Partial<NoteModel>) {
    super();
    Object.assign(this, fields);
  }
}
