import { PosBaseView } from './posBaseView';

export class PartView extends PosBaseView {
  VOICE: string;
  TENSE: string;
  GENDER: string;
  CASE: string;
  NUMBER: string;
  public constructor(fields: Partial<PartView>) {
    super();
    Object.assign(this, fields);
  }
}