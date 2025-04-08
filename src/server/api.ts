import { remultNextApp } from "remult/remult-next";
import { createPostgresDataProvider } from "remult/postgres";
import { getUserFromRequest } from "./auth";
import { User } from "../demo/auth/User";
import { Product } from "../../shared/entities/Product";
import { ProductParams } from "../../shared/entities/ProductParams";
import { Size } from "../../shared/entities/Size";
import { Cart } from "../../shared/entities/Cart";
import { Category } from "../../shared/entities/Category";
import { CartItem } from "../../shared/entities/CartItem";
  
export const api = remultNextApp({
  getUser: getUserFromRequest,
  initApi: async () => {
    await User.createDemoUsers();
  },
  dataProvider: createPostgresDataProvider({
    connectionString: process.env["DATABASE_URL"]    
  }),
  admin: true,
  entities: [User, Product,ProductParams,Size,Cart,Category, CartItem],
});