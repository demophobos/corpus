import { PosBaseView } from './posBaseView';

export class ExclamView extends PosBaseView {
  public constructor(fields: Partial<ExclamView>) {
    super();
    Object.assign(this, fields);
  }
}