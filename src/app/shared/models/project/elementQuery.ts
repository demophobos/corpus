export class ElementQuery {
    value: string;
    sense: boolean;

    public constructor(fields: Partial<ElementQuery>) {
        Object.assign(this, fields);
     }
}