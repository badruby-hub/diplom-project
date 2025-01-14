
import { config } from "../configs/jsph"
import classes from "./Jsph.module.css";
import useSWR from "swr";
import toast from "react-hot-toast";
import { SearchForm } from "../SearchForm/Search";

const
  DELETE = 'del',
  API_URL = "http://localhost:3333/users",
  fetcher = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("fetcher" + res.status);
    return await res.json();
  },
  columns = config.columns.concat(
    { title: "", content: () => <button data-action={DELETE}>del</button> }
  )
export function JSPHTable() {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(API_URL, fetcher),
    onClick = async event => {
      const 
       action = event.target.closest('[data-action]')?.dataset?.action,
       id = +event.target.closest('[data-id]')?.dataset?.id;
       console.log(action,id);
       if(!action) return;
       let 
         optimisticData;
       const 
          getPromise=()=>{
           switch(action){
            case DELETE: 
            optimisticData = data.filter(el => String(el.id) !== String(id));
            return fetch(API_URL + '/' + id, { method: 'DELETE' })
              .then(res => {
                if (!res.ok) {
                  throw new Error(res.status + " " + res.statusText);
                }
              });

           }
          },
          promise=getPromise();

       if(promise){
        toast.promise(promise,{
          loading: "Fetching" + action,
          success: 'ok',
          error: (err) => `${err.toString()}`,
        });
        await mutate(promise.then(optimisticData,fetcher),{optimisticData});
       };
    };
  return <div>
    <div
      className={classes.loading}>
      {isLoading && '⌛'}
      {isValidating && '👁'}
      {error && `❌ ${error.toString()}`}
    </div>
    <div onClick={onClick} >
      {data && <SearchForm data={data} config={{ columns }} />}
    </div>
  </div>
}


