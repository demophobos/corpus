import { PosBaseView } from './posBaseView';

export class AdvView extends PosBaseView {
  DEGREE: string;
  public constructor(fields: Partial<AdvView>) {
    super();
    Object.assign(this, fields);
  }
}