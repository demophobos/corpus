import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class ElementView extends Model {
  apiType: string = AppType.ElementView;
  projectCode: string;
  headerCode: string;
  projectId: string;
  indexName: string;
  indexId:string;
  value: string;
  chunkId: string;
  order:number;
  type:number;
  morphId:string;
  headerId:string;
  lemma: string;
  form: string;
  pos: string;
  gender: string;
  case: string;
  dialect: string;
  feature: string;
  person: string;
  number: string;
  tense: string;
  mood: string;
  voice: string;
  degree: string;
  lang: string;

  public constructor(fields: Partial<ElementView>) {
      super();
    Object.assign(this, fields);
  }
}
