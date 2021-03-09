import { PosBaseView } from './posBaseView';

export class ArticleView extends PosBaseView {
  public constructor(fields: Partial<ArticleView>) {
    super();
    Object.assign(this, fields);
  }
}