// import { Entity, Fields, Relations } from "remult";
// import { Product } from "./Product";
// import { SizeName } from "./Size";


// @Entity("productParams", {
//     allowApiCrud: true,
// })
// export class ProductParams {
//     @Fields.autoIncrement()
//     id!: 0;
//     @Fields.string()
//     article!: string;
//     @Fields.string()
//     gender?: string;
//     @Fields.string()
//     color!: string;
//     @Fields.string()
//     composition!: string;
//     @Fields.integer()
//     ProductId?: number;
//     @Fields.integer()
//     sizeId?: number
//     @Relations.toOne(() => Product, { field: "ProductId" })
//     Product?: Product ;
    
//     @Relations.toOne(() => SizeName, {field: "SizeNameId"})
//     SizeName?: SizeName;

   

// }