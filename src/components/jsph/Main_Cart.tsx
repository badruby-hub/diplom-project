"use client"
import classes from "./Jsph.module.css";
import useSWR from "swr";
import { Product } from "../../../shared/entities/Product";
import toast from "react-hot-toast";
import { TableMain, TableCart } from "../ObjTable/Obj-table_cart_main";
import { EmptyCart, EmptyMain } from "../Error/index";
import { useStore } from "@nanostores/react";
import { repo } from "remult";
import { $filter } from "../../../store/store-data";
import { Loader } from "@/components/Spinner";
import { useSession } from "next-auth/react";
import { CartItem } from "../../../shared/entities/CartItem";


const fetchProduct = async () => {
  return await repo(Product).find({});
};


export function JsphMain() {
  const
    searchFilter: string = useStore($filter);


  const
    { data: session } = useSession();

  const
    { data, error, isLoading, isValidating } = useSWR<Product[]>('products', fetchProduct, { revalidateOnFocus: false });
  const
    { data: cartData, mutate: mutateCart } = useSWR<CartItem[]>("cartItem", fetchCart, { revalidateOnFocus: true });

  const isInCart = (productId: number) => {
    return cartData?.some(item => item.productId === productId)
  }
  const
    filteredData = data ? data.filter(row => {
      if (!searchFilter.length) return true;
      for (const key in row) {
        const keyRow = row[key as keyof Product];
        if (String(keyRow).toLowerCase().includes(searchFilter.toLowerCase())) return true;
      }
      return false;
    }) : [];

  const
    addToCart = async (obj: any) => {
      if (!session?.user) {
        toast.error("Пожалуйста, авторизуйтесь, чтобы добавить товар в корзину.");
        return;
      }
      console.log("IDUser ", session?.user?.id);
      console.log("add", obj);
      const cart = {
        productId: obj.id,
        userId: session?.user!.id,
      };

      if (data) {
        try {
          await repo(CartItem).insert(cart);
          toast.success("Товар добавлен в корзину");
          await mutateCart();
        } catch (error) {
          toast.error("Ошибка при добавлении товара в корзину");
          console.error(error);
        }

      }
    }

  return <>
    <div
      className={classes.loading}>
      {(isLoading || isValidating) && <Loader />}
      {error && `❌ ${error.toString()}`}
    </div>
    {searchFilter.length > 0 && filteredData.length === 0 ?
      <EmptyMain search={searchFilter} />
      :
      <TableMain isInCart={isInCart} addToCart={addToCart} data={filteredData} />
    }
  </>
};

//Корзина 

const fetchCart = async () => {
  return await repo(CartItem).find({
    include: {
      product: true
    }
  })
};



export function JsphCart() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />
  }
  if (!session) {
    toast.error('Авторизуйтесь чтобы увидеть  корзину ')
    return <EmptyCart />
  }
  const
    { data, error, isLoading, isValidating, mutate } = useSWR<CartItem[]>('cartItem', fetchCart, { revalidateOnFocus: true });
  let
    optimisticData;
  const delPost = async (productId: number) => {
    if (data) {
      try {
        await repo(CartItem).delete(productId);
        optimisticData = data.filter(el => el.productId !== (productId));
        toast.success("Товар удален")
        await mutate(fetchCart, { optimisticData, revalidate: true });
      } catch (error: any) {
        toast.error("Ошибка при удалении товара")
        console.log(error)
      }
    }
    if (!data) {
      throw new Error();
    }
  }


  return <>
    <div
      className={classes.loading}>
      {(isLoading || isValidating) && <Loader />}
      {error && `❌ ${error.toString()}`}
    </div>
    {data && data.length > 0 && !isLoading
      ? <TableCart data={data} delPost={delPost} />
      : <EmptyCart />
    }
  </>
}