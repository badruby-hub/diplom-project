import classes from "./Jsph.module.css";
import useSWR from "swr";
import toast from "react-hot-toast";
import { useState } from "react";
import { ObjTable } from "../ObjTable";



const
  ADD = 'add',
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
export function JSPHTable() {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, infofetcher, { revalidateOnFocus: false });
    let optimisticData;
    const AddPost = async (newObj) => {
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
      toast.success('Дело добавлено');
      console.log(newObj);
  }

  return <>
    <div
      className={classes.loading}>
      {isLoading && '⌛'}
      {isValidating && '👁'}
      {error && `❌ ${error.toString()}`}
    </div>
    {data && <ObjTable data={data} addPost={AddPost} />}

  </>
}


