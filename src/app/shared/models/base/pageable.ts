export abstract class Pageable {
    public count: number;
    public skip: number;
    public total?: number;
    public getTotal?: boolean;
}
