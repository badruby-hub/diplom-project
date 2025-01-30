import classes from "./Jsph.module.css";
import useSWR from "swr";
import toast from "react-hot-toast";
import { TableMain,TableCart } from "../ObjTable/Obj-table";

const
  API_URL = "http://localhost:3333/items",
  CART_URL = "http://localhost:3333/cart",

  fetcher = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("fetcher" + res.status);
    return await res.json();
  },
  infofetcher = async () => {
    console.log("infofetcher",);
    const pr = fetcher();
    toast.promise(pr, {
      loading: 'Загрузка',
      success: 'Авто-обновление',
      error: (err) => `${err.toString()}`,
    });
    return await pr
  };
export function JsphMain() {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, infofetcher, { revalidateOnFocus: false }),
    { data : cartData } = useSWR(CART_URL, infofetcherCart, { revalidateOnFocus: false });
    let optimisticData;
    const isInCart = (id) => {
      return cartData && cartData.map(item => item.id).includes(id);
    };
 


    const AddToCart = async (newObj) => {
      if (data) {
          optimisticData = data.concat(newObj);
      } else {
          optimisticData = [newObj];
      }
      const response = await fetch(CART_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newObj)
      });
  
      if (!response.ok) {
          throw new Error(response.status + ' ' + response.statusText);
      }
      await mutate(fetcher, { optimisticData, revalidate: true });
      toast.success('Товар добавлен в корзину');
  }

  return <>
    <div
      className={classes.loading}>
      {isLoading && '⌛'}
      {isValidating && '👁'}
      {error && `❌ ${error.toString()}`}
    </div>
    {data && <TableMain data={data} addToCart={AddToCart} isInCart={isInCart} />}

  </>
};


const
  fetcherCart = async () => {
    const res = await fetch(CART_URL);
    if (!res.ok) throw new Error("fetcherCart" + res.status);
    return await res.json();
  },
  infofetcherCart = async () => {
    console.log("infofetcherCart",);
    const pr = fetcherCart();
    toast.promise(pr, {
      loading: 'Загрузка',
      success: 'Авто-обновление',
      error: (err) => `${err.toString()}`,
    });
    return await pr
  };
export function JsphCart() {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(CART_URL, infofetcherCart, { revalidateOnFocus: false });
    
    const DelPost = async (id) => {
      const optimisticData = data?.filter(el => String(el.id) !== String(id));
      const response = await fetch(CART_URL + '/' + id, { method: 'DELETE' });

      if (!response.ok) {
          throw new Error(response.status + ' ' + response.statusText);
      }

      await mutate(fetcherCart, { optimisticData, revalidate: true });
      toast.success('Дело удалено');
  }

  return <>
    <div
      className={classes.loading}>
      {isLoading && '⌛'}
      {isValidating && '👁'}
      {error && `❌ ${error.toString()}`}
    </div>
    {data && <TableCart data={data} delPost={DelPost} />}

  </>
}


