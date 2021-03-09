import { PosBaseView } from './posBaseView';

export class VerbView extends PosBaseView {
  TENSE: string;
  MOOD: string;
  CASE: string;
  NUMBER: string;
  PERSON: string;
  GENDER: string;
  VOICE: string;
  public constructor(fields: Partial<VerbView>) {
    super();
    Object.assign(this, fields);
  }
}