import { PosBaseView } from './posBaseView';

export class ArticleView extends PosBaseView {
  GENDER: string;
  CASE: string;
  NUMBER: string;
  public constructor(fields: Partial<ArticleView>) {
    super();
    Object.assign(this, fields);
  }
}