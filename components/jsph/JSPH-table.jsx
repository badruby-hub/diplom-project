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
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, infofetcher, { revalidateOnFocus: false }),
    [addItem, setAddItem] = useState(),
    onClick = async event => {
      const
        action = event.target.closest('[data-action]')?.dataset?.action,
        id = +event.target.closest('[data-id]')?.dataset?.id;
      console.log("action and id", action, id);
      console.log("addItem", addItem);
      console.log("data", data);
      if (!action) return;
      let
        optimisticData;
      const
        getPromise = () => {
          switch (action) {
            case ADD:
              const newObj = {};
              optimisticData = data.concat(newObj);
              console.log("newObj", newObj);
              return fetch(API_URL,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newObj)
                }).then(res => {
                  if (!res.ok) {
                    throw new Error(res.status + " " + res.statusText);
                  }
                });


          }
        },
        promise = getPromise();

      if (promise) {
        toast.promise(promise, {
          loading: "Fetching" + action,
          success: 'ok',
          error: (err) => `${err.toString()}`,
        });
        await mutate(promise.then(optimisticData, fetcher), { optimisticData });
      };
    };
  return <>
    <div
      className={classes.loading}>
      {isLoading && '⌛'}
      {isValidating && '👁'}
      {error && `❌ ${error.toString()}`}
    </div>
    {data && <ObjTable data={data} />}

  </>
}


