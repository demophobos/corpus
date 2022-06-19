export class ChunkQuery {
    value: string;
    valueOp: string = 'and';
    valueIp: string;
    searchLemma: boolean = false;
    index: number = 0;
    total: number = 0;
    skip: number = 0;
    limit: number = 0;
    topUpdated: boolean = false;
    includeIds: string [];
    headers: string[] = [];
    pos: string[] = [];
    gender: string[] = [];
    case: string[] = [];
    person: string[] =[];
    number: string[] = [];
    tense: string[] = [];
    mood: string[] = [];
    voice: string[] = [];
    degree: string[] = [];
    quid: string;
    public constructor(fields: Partial<ChunkQuery>) {
        Object.assign(this, fields);
     }
}