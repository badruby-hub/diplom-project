import { useCallback, useState } from "react";
import { Fetcher } from "../Fetcher";
import {config} from "../configs/jsph"
import { SearchForm } from "../SearchForm/Search";
import classes from "./Jsph.module.css";
import useSWR from "swr";
import toast from "react-hot-toast";

const
  random = Math.random(),
  API_URL = "http://localhost:3333/item/",
  fetcher = async ()=>{
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("fetcher"+ res.status);
    return await  res.json();
  };

export function JSPHTable() {
    const
      {data,error, isLoading,isValidating,mutate} = useSWR(API_URL,fetcher)
    return <div> 
            <div
            className={classes.loading}>
            {isLoading && '⌛'}
            {isValidating && '👁'}
            {error && `❌ ${error.toString()}`}
            </div>
            <div>
             {data && <SearchForm data={data} config={config}/>}
             </div>
             </div>
}




// export function JSPHTable() {
//   const
//     [users, setUsers] = useState(null),
//     onLoad = useCallback(data => setUsers(data), []);
//   console.debug('Demo render');

//   return <>

//     <Fetcher
//       url={"https://jsonplaceholder.typicode.com/users?" + random}
//       onLoad={onLoad}
//     >
//       <SearchForm data={users} config={config} />
    
//     </Fetcher>


//   </>
// }