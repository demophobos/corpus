import { FormSearchType } from "@shared/enums";

export class ChunkQuery {
    value: string;
    formSearchType: FormSearchType = FormSearchType.Free
    total: number;
    skip: number;
    limit: number;
    public constructor(fields: Partial<ChunkQuery>) {
        Object.assign(this, fields);
     }
}