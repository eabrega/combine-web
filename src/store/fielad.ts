export interface IField {
    id: string,
    name: string
}

export class Field {
    public Id: string;
    public Name: String;
    public Area = 767;
    public Code = 92823;

    constructor(ifield: IField) {
        this.Id = ifield.id;
        this.Name = ifield.name;
    }
}