import { Entity, Fields, Relations } from "remult";
import { SizeProduct } from "./SizeProduct";
import { ProductParams } from "./ProductParams";


@Entity("size", {
    allowApiCrud: true,
})
export class Size {
    @Fields.autoIncrement()
    id!: 0;
    @Fields.string()
    size!: string;

    @Relations.toMany(() => ProductParams)
    ProductParams?: ProductParams[]
}