import { Entity, Fields, Relations } from "remult";
import { Category } from "./Category";
import { SizeProduct } from "./SizeProduct";
@Entity("product", {
    allowApiCrud: true,
})
export class Product {
    @Fields.autoIncrement()
    id = 0;

    @Fields.string()
    title!: string;

    @Fields.integer()
    price!: number;

    @Fields.string()
    description?: string;

    @Fields.boolean()
    badge?: false;

    @Fields.string()
    images!: string;

    @Fields.integer()
    CategoryId?: number;

    @Fields.string()
    article!: string;

    @Fields.string()
    gender?: string;

    @Fields.string()
    color!: string;

    @Fields.string()
    composition!: string;


    @Relations.toMany(() => SizeProduct, "productId")
    sizeProduct?: SizeProduct[]

    @Relations.toOne(() => Category, { field: "CategoryId" })
    category?: Category;

}