import { config } from "../configs/jsph"
import classes from "./Jsph.module.css";
import useSWR from "swr";
import toast from "react-hot-toast";
import { ObjTable } from "../ObjTable";
import { SearchForm } from "../SearchForm/Search";
import { useState } from "react";


const
  ADD = 'add',
  API_URL = "http://localhost:3333/users",
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
  },
  columns = config.columns.concat(
    { title: "", content: () => <button data-action={ADD}>add</button> }
  )
export function JSPHTable() {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, infofetcher, { revalidateOnFocus: false }),
    [addItem, setAddItem] = useState(Array.from({length:config.columns.length},()=>'')),
    onClick = async event => {
      const
        action = event.target.closest('[data-action]')?.dataset?.action,
        id = +event.target.closest('[data-id]')?.dataset?.id;
      console.log(action, id);
      console.log(addItem)
      if (!action) return;
      let
        optimisticData;
      const
        getPromise = () => {
          switch (action) {
            case ADD:
              const newObj = {};
              config.columns.map(({setVal},i)=> setVal && Object.assign(newObj,setVal(addItem[i])));
              optimisticData = data.concat(newObj);
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
    <header>
      {data && <SearchForm data={data} config={{ columns }} />}
    </header>
    <main onClick={onClick} >
      {data && <ObjTable data={data} config={{ columns }} />}
    </main>
  </>
}


