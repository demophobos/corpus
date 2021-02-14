export class QueryMorph {
    id: string;
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
    public constructor(fields: Partial<QueryMorph>) {
        Object.assign(this, fields);
     }
}