import { Entity, Fields, Relations } from "remult";
import { ProductParams } from "./ProductParams";
import { Category } from "./Category";
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


    @Relations.toMany(() => ProductParams)
    ProductParams?: ProductParams[]

    @Relations.toOne(() => Category, { field: "CategoryId" })
    Category?: Category;

}