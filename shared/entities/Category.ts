import { Entity, Fields, Relations } from "remult";

@Entity("category", {
    allowApiCrud: true,
})
export class Category {
    @Fields.autoIncrement()
    id = 0;
    @Fields.string()
    category!: string;
    @Fields.string()
    label!: string;


}