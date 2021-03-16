import { PosBaseView } from './posBaseView';

export class ArticleView extends PosBaseView {
  GENUS: string;
  CASUS: string;
  NUMERUS: string;
  public constructor(fields: Partial<ArticleView>) {
    super();
    Object.assign(this, fields);
  }
}