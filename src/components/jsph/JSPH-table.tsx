import classes from "./Jsph.module.css";
import useSWR from "swr";
import { Product } from "../../../shared/entities/Product";
import { Cart } from "../../../shared/entities/Cart";
import toast from "react-hot-toast";
import { TableMain, TableCart } from "../ObjTable/Obj-table";
import { EmptyCart, EmptyMain } from "../Error/index";
import { useStore } from "@nanostores/react";
import { remult, repo } from "remult";
import { $search } from "../../../store/store-data";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Spinner";



const productRepo = repo(Product);
const cartRepo = repo(Cart);


const fetchProduct = async () =>{
  return await productRepo.find({});
};

const fetchCart = async () =>{
  return await cartRepo.find({
    where: { idUser: remult.user!.id }
  });
};










export function JsphMain() {
  const
    searchFilter: string = useStore($search);

  const
    { data, error, isLoading, isValidating, mutate } = useSWR<Product[]>('products', fetchProduct, { revalidateOnFocus: false }),
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
      if (!remult.user) {
        toast.error("Пожалуйста, авторизуйтесь, чтобы добавить товар в корзину.");
        return;
      }
      console.log("IDUser ", remult.user?.id);
      console.log("add", obj);
      const cartItem = {
        idProduct: obj.id,
        title: obj.title,
        description: obj.description,
        price: obj.price,
        images: obj.images,
        color: obj.color,
        idUser: remult.user!.id,
      };

      if (data) {
        try {
          await cartRepo.insert(cartItem);
          toast.success("Товар добавлен в корзину");
          optimisticData = await fetchProduct();
          await mutate(fetchProduct, { optimisticData, revalidate: true });
          console.log("muteta", optimisticData);
        } catch {
          toast.error("Ошибка при добавлении товара в корзину");
          console.error(error);
        }

      }
    }



  console.log("JsphMain", data);


  return <>
    <div
      className={classes.loading}>
      {isLoading && <Loader />}
      {isValidating && "👁"}
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
    { data, error, isLoading, isValidating, mutate } = useSWR<Cart[]>('cart', fetchCart, { revalidateOnFocus: false });
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
      {isLoading && <Loader />}
      {isValidating && "👁"}
      {error && `❌ ${error.toString()}`}
    </div>
    {data && data.length > 0 && !isLoading
      ?
      !isValidating && <TableCart data={data} delPost={delPost} />
      :
      !isValidating && <EmptyCart />

    }
  </>
}