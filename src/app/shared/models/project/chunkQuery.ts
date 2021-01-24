import { FormSearchTypeEnum } from "@shared/enums";
import { TaxonomyViewModel } from "./taxonomyViewModel";

export class ChunkQuery {
    value: string;
    formSearchType: FormSearchTypeEnum = FormSearchTypeEnum.Form
    index: number;
    total: number;
    skip: number;
    limit: number;
    forms: string [];
    headers: string[];
    formAttrs: string[];
    public constructor(fields: Partial<ChunkQuery>) {
        Object.assign(this, fields);
     }
}