import { PosBaseView } from './posBaseView';

export class NumView extends PosBaseView {
  GENUS: string;
  CASUS: string;
  NUMERUS: string;
  public constructor(fields: Partial<NumView>) {
    super();
    Object.assign(this, fields);
  }
}