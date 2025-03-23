import { Entity, Fields, Relations } from "remult";
import { Product } from "./Product";
import { Size } from "./Size";

@Entity("productParams", {
    allowApiCrud: true,
})
export class ProductParams {
    @Fields.autoIncrement()
    id = 0;
    @Fields.string()
    article!: string;
    @Fields.string()
    gender?: string;
    @Fields.string()
    color!: string;
    @Fields.integer()
    ProductId?: number;

    @Relations.toOne(() => Product, { field: "ProductId" })
    Product?: Product ;
    
    @Relations.toMany(() => Size)
    Size?: Size[]

   

}