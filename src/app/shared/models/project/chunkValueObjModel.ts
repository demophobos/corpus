export class ChunkValueItemModel
{
    id: string;
    value: string;
    type: number;
    order: number;
    morphId: string;
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

    public constructor(fields: Partial<ChunkValueItemModel>) {
        Object.assign(this, fields);
     }
}