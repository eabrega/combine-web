export interface IFieldsResponse {
    items: Array<IField>
    totalCount: number
}

export interface IField {
    id: string,
    name: string,
    area: number,
    code: number
}

export class Field {
    public Id: string;
    public Name: String;
    public Area: number;
    public Code: number;

    constructor(ifield: IField) {
        this.Id = ifield.id;
        this.Name = ifield.name;
        this.Code = ifield.code;
        this.Area = ifield.area;
    }
}

export class FieldResponse {
    Items: Array<Field>;
    TotalCount: number;

    constructor(response: IFieldsResponse) {
        this.Items = response.items.map(f => new Field(f));
        this.TotalCount = response.totalCount;
    }
}