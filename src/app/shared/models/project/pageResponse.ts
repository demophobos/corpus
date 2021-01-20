export class PageResponse{
    documents: any[];
    total:number;
    skipped: number;
    limited: number;

    public constructor(fields: Partial<PageResponse>) {
        Object.assign(this, fields);
     }
}