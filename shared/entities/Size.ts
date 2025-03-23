import { Entity, Fields, Relations } from "remult";
import { ProductParams } from "./ProductParams";

@Entity("size", {
    allowApiCrud: true,
})
export class Size {
    @Fields.autoIncrement()
    id!: number;
    @Fields.string()
    s!: string;
    @Fields.string()
    m!: string;
    @Fields.string()
    l!: string;
    @Fields.string()
    xl!: string;
    @Fields.string()
    xxl!: string;

    @Fields.integer()
    ProductParamsId?: number;
     
    @Relations.toOne(() => ProductParams, { field: "ProductParamsId" })
    ProductParams?: ProductParams
}