"use client"
import useSWR from "swr";
import { Product } from "../../../shared/entities/Product";
import toast from "react-hot-toast";
import { TableMain, TableCart } from "../ObjTable/Obj-table_cart_main";
import { EmptyAuth, EmptyCart, EmptyMain } from "../Error/index";
import { useStore } from "@nanostores/react";
import { repo } from "remult";
import { $filter, $selectedCategoryId } from "../../../store/store-data";
import { Loader } from "@/components/Spinner";
import { useSession } from "next-auth/react";
import { CartItem } from "../../../shared/entities/CartItem";
import { useState } from "react";
import { Pagination } from "../Pagination/Pagination"

const fetchProduct = async () => {
  return await repo(Product).find({
    include: {
      category: true,
      sizeProduct: {
        include: {
          sizeName: true
        }
      }
    }
  });
};

export function JsphMain() {
  const
    searchFilter: string = useStore($filter);

  const
    selectedCategoryId: number | null = useStore($selectedCategoryId);

  const
    { data: session } = useSession();

  const
    { data, error, isLoading } = useSWR<Product[]>('products', fetchProduct, { revalidateOnFocus: false });

  const
    { data: cartData, mutate: mutateCart } = useSWR<CartItem[]>("cartItem", fetchCart, { revalidateOnFocus: true });


  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage] = useState(12);




  const
    filteredData = data ? data.filter(row => {
      if (selectedCategoryId && row.CategoryId !== selectedCategoryId) return false
      if (!searchFilter.length) return true;
      for (const key in row) {
        const keyRow = row[key as keyof Product];
        if (String(keyRow).toLowerCase().includes(searchFilter.toLowerCase())) return true;
      }
      return false;
    }) : [];
  const lastIndex = currentPage * countPerPage;
  const firsIndex = lastIndex - countPerPage;
  const currentItem = filteredData?.slice(firsIndex, lastIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const isInCart = (productId: number) => {
    return cartData?.some(item => item.productId === productId)
  }
  const
    addToCart = async (obj: any) => {
      if (!session?.user) {
        toast.error("Пожалуйста, авторизуйтесь, чтобы добавить товар в корзину.");
        return;
      }
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

  if (error) {
    return <>Ошибка {JSON.stringify(error)}</>
  }

  if (isLoading) {
    return <Loader />
  }

  if (searchFilter.length > 0 && filteredData.length === 0) {
    return <EmptyMain search={searchFilter} />
  }
  return <>

    <TableMain isInCart={isInCart} addToCart={addToCart} data={currentItem} />
    <Pagination
      countPerPage={countPerPage}
      totalItem={filteredData?.length}
      paginate={paginate}
    />
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

  if (error) {
    if (error.status === 403) {
      return <EmptyAuth />
    }
    return <>Ошибка {JSON.stringify(error)}</>
  }
  if (isLoading) {
    return <Loader />
  }
  if (0 === data?.length) {
    return <EmptyCart />
  }
  return <TableCart data={data} delPost={delPost} />

}