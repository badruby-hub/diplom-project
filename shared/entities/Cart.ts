import { Entity, Fields, Relations } from "remult";

@Entity("cart", {
    allowApiCrud: true,
})
export class Cart {
    @Fields.autoIncrement()
    id = 0;
    @Fields.integer()
    idProduct = 0;
    @Fields.string()
    title!: string;
    @Fields.integer()
    price?: number;
    @Fields.string()
    description?: string;
    @Fields.boolean()
    badge?: false;
    @Fields.string()
    images?: string;
    @Fields.string()
    color?: string;

}