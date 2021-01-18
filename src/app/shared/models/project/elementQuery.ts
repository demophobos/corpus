import { FormSearchType } from "@shared/enums";

export class ElementQuery {
    value: string;
    caseSensitive: boolean = false;
    formSearchType: FormSearchType = FormSearchType.Free

    public constructor(fields: Partial<ElementQuery>) {
        Object.assign(this, fields);
     }
}