import { Entity } from "typeorm";


export class CreateProductDto {
   
    id: number;

    name: string;

    price: number;

    quantity: number;

   
}
