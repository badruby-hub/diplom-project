// import { config } from "../configs/jsph"
import classes from "./Jsph.module.css";
import useSWR from "swr";
import toast from "react-hot-toast";
import { ObjTable } from "../ObjTable";
import {  useState } from "react";


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
  }
export function JSPHTable({search}) {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, infofetcher, { revalidateOnFocus: false }),
    [addItem, setAddItem] = useState(),
     filteredData = data ? data.filter(item => item.title && item.title.includes(search)) : [],
    onClick = async event => {
      if (!action) return;
      let
        optimisticData;
      const
        getPromise = () => {
          switch (action) {
            case ADD:
              const newObj = {};
              optimisticData = data.concat(newObj);
              console.log("newObj",newObj);
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
    <main onClick={onClick} >
      {filteredData  && <ObjTable data={filteredData} />}
    </main>
  </>
}


