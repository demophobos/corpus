import { TaxonomyViewModel } from "./taxonomyViewModel";

export class ChunkQuery {
    value: string;
    searchLemma: boolean = false;
    index: number;
    total: number;
    skip: number;
    limit: number;
    forms: string [];
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
    public constructor(fields: Partial<ChunkQuery>) {
        Object.assign(this, fields);
     }
}