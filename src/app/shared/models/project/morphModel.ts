import { AppType } from '@shared/constants';
import { Model } from '../base/model';

export class MorphModel extends Model {
    apiType: string = AppType.Morph;
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
    public constructor(fields: Partial<MorphModel>) {
        super();
        Object.assign(this, fields);
     }
}