import { FormSearchType } from "@shared/enums";

export class ChunkQuery {
    value: string;
    formSearchType: FormSearchType = FormSearchType.Free
    index: number;
    total: number;
    skip: number;
    limit: number;
    public constructor(fields: Partial<ChunkQuery>) {
        Object.assign(this, fields);
     }
}