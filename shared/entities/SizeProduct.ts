import { Entity, Fields, Relations } from "remult";
import { Size } from "./Size";
import { Product } from "./Product";

@Entity("sizeProduct", {
    allowApiCrud: true,
})
export class SizeProduct {
    @Fields.autoIncrement()
    id!: number;
    @Fields.integer({ allowNull: true })
    productId!: number;
    @Fields.integer({ allowNull: true })
    sizeId!: number ;
    
    @Relations.toOne(()=>Product, { field: "ProductId" })
    Product?: Product;

    @Relations.toOne(()=>Size, { field: "SizeId" })
    Size?: Size;
}