export class TaxonomyQuery {
    code: string;
    categoryId: string;
    categoryCode:  string;
    public constructor(fields: Partial<TaxonomyQuery>) {
        Object.assign(this, fields);
     }
}