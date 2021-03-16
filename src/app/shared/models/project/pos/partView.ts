import { PosBaseView } from './posBaseView';

export class PartView extends PosBaseView {
  GENUS_VERBI: string;
  TEMPUS: string;
  GENUS: string;
  CASUS: string;
  NUMERUS: string;
  public constructor(fields: Partial<PartView>) {
    super();
    Object.assign(this, fields);
  }
}