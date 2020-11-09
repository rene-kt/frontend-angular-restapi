export class Product{
    id: number;
    name: string;
    value: number;
    quantity: number;

    constructor(name: string, value: number, quantity: number ) {
        this.name = name;
        this.value = value;
        this.quantity = quantity;
    }

}
