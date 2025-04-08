import { Roles } from "@/demo/auth/Roles";
import { User } from "@/demo/auth/User";
import { Entity, Fields, Relations, remult } from "remult";
import { Product } from "./Product";

@Entity("cartitem", {
    allowApiCrud: true,
    apiPrefilter: () => {
        
        // if (remult.isAllowed(Roles.admin)) return {}; 
        return {
            userId: remult.user!.id, 
        };
      },
})
export class CartItem {
@Fields.autoIncrement()
    id = 0;
@Fields.string({ allowNull: true })
    userId?: string  

@Relations.toOne(() => User, { field: "userId" })
    user?: User

@Fields.string({ allowNull: true })
productId?: string

 @Relations.toOne(() => User, { field: "userId" })
    product?: Product

}