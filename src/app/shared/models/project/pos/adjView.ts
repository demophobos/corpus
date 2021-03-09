import { PosBaseView } from './posBaseView';

export class AdjView extends PosBaseView {
  GENDER: string;
  CASE: string;
  NUMBER: string;
  DEGREE: string;
  public constructor(fields: Partial<AdjView>) {
    super();
    Object.assign(this, fields);
  }
}