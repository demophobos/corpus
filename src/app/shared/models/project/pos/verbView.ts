import { PosBaseView } from './posBaseView';

export class VerbView extends PosBaseView {
  TEMPUS: string;
  MODUS: string;
  CASUS: string;
  NUMERUS: string;
  PERSON: string;
  GENUS: string;
  GENUS_VERBI: string;
  public constructor(fields: Partial<VerbView>) {
    super();
    Object.assign(this, fields);
  }
}