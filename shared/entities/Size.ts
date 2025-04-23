import { Entity, Fields, Relations } from "remult";
import { SizeProduct } from "./SizeProduct";
// import { ProductParams } from "./ProductParams";


@Entity("sizeName", {
    allowApiCrud: true,
})
export class SizeName {
    @Fields.autoIncrement()
    id!: 0;

    @Fields.string()
    size!: string;

    @Relations.toMany(() => SizeProduct, 'sizeId')
    sizeProduct?: SizeProduct[]
}