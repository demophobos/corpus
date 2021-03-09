import { PosBaseView } from './posBaseView';

export class ParticView extends PosBaseView {
  public constructor(fields: Partial<ParticView>) {
    super();
    Object.assign(this, fields);
  }
}