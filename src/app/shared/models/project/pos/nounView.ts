import { stringify } from '@angular/compiler/src/util';
import { PosBaseView } from './posBaseView';

export class NounView extends PosBaseView {
  GENDER: string;
  CASE: string;
  NUMBER: string;
  public constructor(fields: Partial<NounView>) {
    super();
    Object.assign(this, fields);
  }
}
