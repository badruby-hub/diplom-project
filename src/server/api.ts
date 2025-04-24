import { remultNextApp } from "remult/remult-next";
import { createPostgresDataProvider } from "remult/postgres";
import { getUserFromRequest } from "./auth";
import { User } from "../demo/auth/User";
import { Product } from "../../shared/entities/Product";
// import { ProductParams } from "../../shared/entities/ProductParams";
import { SizeName } from "../../shared/entities/Size";
import { Cart } from "../../shared/entities/Cart";
import { Category } from "../../shared/entities/Category";
import { CartItem } from "../../shared/entities/CartItem";
import { SizeProduct } from "../../shared/entities/SizeProduct";
import { Roles } from "@/demo/auth/Roles";
  
export const api = remultNextApp({
  getUser: getUserFromRequest,
  initApi: async () => {
    await User.createDemoUsers();
  },
  dataProvider: createPostgresDataProvider({
    connectionString: process.env["DATABASE_URL"]    
  }),
  admin: Roles.admin,
  entities: [User, Product,SizeName,Cart,Category, CartItem, SizeProduct],
});