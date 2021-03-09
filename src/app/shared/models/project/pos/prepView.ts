import { PosBaseView } from './posBaseView';

export class PrepView extends PosBaseView {
  public constructor(fields: Partial<PrepView>) {
    super();
    Object.assign(this, fields);
  }
}