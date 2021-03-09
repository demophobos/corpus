import { PosBaseView } from './posBaseView';

export class PronView extends PosBaseView {
  GENDER: string;
  CASE: string;
  NUMBER: string;
  public constructor(fields: Partial<PronView>) {
    super();
    Object.assign(this, fields);
  }
}