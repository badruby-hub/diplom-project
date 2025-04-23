import { Entity, Fields, Relations } from "remult";
import { SizeName } from "./Size";
import { Product } from "./Product";

@Entity("sizeProduct", {
    allowApiCrud: true,
    id:{
        sizeId: true,
        productId: true
    }
})
export class SizeProduct {
    @Fields.autoIncrement()
    id!: number;
    
    @Fields.integer({ allowNull: true })
    productId!: number;


    @Fields.integer({ allowNull: true })
    sizeId!: number ;
    
    @Relations.toOne(()=>Product, { field: "ProductId" })
    product?: Product;

    @Relations.toOne(()=>SizeName, { field: "SizeNameId" })
    sizeName?: SizeName;
}