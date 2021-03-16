import { PosBaseView } from './posBaseView';

export class AdjView extends PosBaseView {
  GENUS: string;
  CASUS: string;
  NUMERUS: string;
  GRADUS: string;
  public constructor(fields: Partial<AdjView>) {
    super();
    Object.assign(this, fields);
  }
}