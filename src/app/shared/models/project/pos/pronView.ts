import { PosBaseView } from './posBaseView';

export class PronView extends PosBaseView {
  GENUS: string;
  CASUS: string;
  NUMERUS: string;
  public constructor(fields: Partial<PronView>) {
    super();
    Object.assign(this, fields);
  }
}