import { PosBaseView } from './posBaseView';

export class ConjView extends PosBaseView {
  public constructor(fields: Partial<ConjView>) {
    super();
    Object.assign(this, fields);
  }
}