import classes from "./Jsph.module.css";
import useSWR from "swr";
import { Product } from "../../../shared/entities/Product";
import { Cart } from "../../../shared/entities/Cart";
import toast from "react-hot-toast";
import { TableMain, TableCart } from "../ObjTable/Obj-table";
import { EmptyCart, EmptyMain } from "../Error/index";
import { useStore } from "@nanostores/react";
import { repo } from "remult";
import { $search } from "../../../store/store-data";
import { useState } from "react";



const productRepo = repo(Product);
const cartRepo = repo(Cart);

const fetchProduct = async () => {
  const products = await productRepo.find({});
  return products
};

const infoFetch = async () => {
  console.log("infofetcher",);
  const pr = fetchProduct();
  toast.promise(pr, {
    loading: "Загрузка",
    error: (err) => `${err.toString()}`,
  })
  return pr
};

const fetchCart = async () => {
  const cartItem = await cartRepo.find({});
  return cartItem
};

const infoFetchCart = async () => {
  console.log("infofetcher Cart",);
  const ct = fetchCart();
  toast.promise(ct, {
    loading: "Загрузка",
    error: (err) => `${err.toString()}`,
  })
  return ct
};







export function JsphMain() {
  const
    searchFilter: string = useStore($search);

  const
    { data, error, isLoading, isValidating, mutate } = useSWR<Product[]>('products', infoFetch, { revalidateOnFocus: false }),
    { data: cartData } = useSWR<Cart[]>('cart', fetchCart);
  let
    optimisticData;
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
    isInCart = (id: number) => {
      console.log("isInCart", cartData);
      if (!cartData) return false;
      return cartData && cartData.map(item => item.idProduct).includes(id);
    };

  const
    addToCart = async (obj: any) => {
      console.log("add", obj);
      const cartItem = {
        idProduct: obj.id,
        title: obj.title,
        description: obj.description,
        price: obj.price,
        images: obj.images,
        color: obj.color,
      };

      if (data) {
        optimisticData = await cartRepo.insert(cartItem);
        toast.success("Товар добавлен в корзину");
        await mutate(fetchProduct, { revalidate: true });
        console.log("muteta", optimisticData);
      }



    }



  console.log("JsphMain", data);


  return <>
    <div
      className={classes.loading}>
      {isLoading && '⌛'}
      {isValidating && '👁'}
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





export function JsphCart() {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR<Cart[]>('cart', infoFetchCart, { revalidateOnFocus: false });
  let
    optimisticData;
  const delPost = async (idProduct: number) => {
    console.log("Удаление товара с id:", idProduct);
    if (data) {
      try {
        await cartRepo.delete(idProduct);
        optimisticData = data.filter(el => el.id !== (idProduct));
        toast.success("Товар удален")
        await mutate(fetchCart, { optimisticData, revalidate: true });
        console.log("muteta cart", mutate);
      } catch (error: any) {
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
      {isLoading && '⌛'}
      {isValidating && '👁'}
      {error && `❌ ${error.toString()}`}
    </div>
    {data && data.length > 0
      ?
      <TableCart data={data} delPost={delPost} />
      :
      <EmptyCart />
    }
  </>
}
