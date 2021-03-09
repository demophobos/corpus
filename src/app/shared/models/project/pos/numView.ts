import { PosBaseView } from './posBaseView';

export class NumView extends PosBaseView {
  GENDER: string;
  CASE: string;
  NUMBER: string;
  public constructor(fields: Partial<NumView>) {
    super();
    Object.assign(this, fields);
  }
}