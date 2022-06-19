import { PosBaseView } from './posBaseView';

export class NounView extends PosBaseView {
  GENUS: string;
  CASUS: string;
  NUMERUS: string;
  public constructor(fields: Partial<NounView>) {
    super();
    Object.assign(this, fields);
  }
}
