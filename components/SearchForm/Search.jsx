import { useMemo, useState } from "react";
import classes from "./Search.module.css";
import {BtnInSearch} from "../Buttons/Buttons"
import { $search, $isOpen } from "@/store/store-data";
import { useStore } from "@nanostores/react";

export function SearchForm({ data }) {
    console.log('SearchForm',data);
    const
        [sort, setSort] = useState(null),
        [search, setSearch] = useState(''),
        [isOpen, setIsOpen] = useState(true),
        [selectedIndex, setSelectedIndex] = useState(-1),
        sortAndFilterData = useMemo(() => {
            return data
                .filter(row => {
                    if (!search.length) return true;
                    for (const key in row) {
                        console.log({ key, row }, row[key]?.includes)
                        if (String(row[key]).toLowerCase()?.includes?.(search.toLowerCase())) return true;
                    }
                    console.log(search)
                    return false;
                });
        }, [data, sort, search]),

        itemClick = (event) => {
            const textInValue = event.target.textContent;
            setSearch(textInValue)
            $search.set(textInValue);
            setIsOpen(!isOpen);
        },
        eventSearch = (event)=>{
         if(event.key === 'Enter'){
              event.preventDefault();
            if(selectedIndex >= 0 && selectedIndex < sortAndFilterData.length){
                const 
                   selectedItem = sortAndFilterData[selectedIndex];
                   setSearch(selectedItem.title);
                   $search.set(selectedItem.title);
            }else { 
                $search.set(search);
            }
            
              setIsOpen(!isOpen);
              setSelectedIndex(-1);
         }

         if(event.key === 'Backspace'){
            setIsOpen(true);
         }
         if(event.key === 'ArrowDown'){
            event.preventDefault();
            setSelectedIndex(prevIndex => Math.min(prevIndex + 1, sortAndFilterData.length - 1 ));
         }
         if(event.key === 'ArrowUp'){
            event.preventDefault();
            setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0  ));
         }
        },
        btnSearch=(event)=>{
            event.preventDefault();
            $search.set(search);
            setIsOpen(!isOpen);
            setSelectedIndex(-1);
        },
    clearForm = ()=>{
      $search.set('');
      setSearch('');
      setSelectedIndex(-1);
    },
    inputClick = () => {
        $isOpen.set(false);
        setIsOpen(true);
        setSelectedIndex(-1);
    };
    return <>
        <form className={classes.search__form}>
            <input
                className={classes.search__input}
                value={search}
                onInput={event => setSearch(event.target.value)}
                onClick={inputClick}
                onKeyDown={eventSearch}
                />
                
            <ul className={classes.autocomplete}>
                {
                    search && isOpen
                        ?  sortAndFilterData
                        .filter(row => {
                            if (!search.length) return true;
                            for (const key in row) {
                                console.log({ key, row }, row[key]?.includes)
                                if (String(row[key]).toLowerCase()?.includes?.(search.toLowerCase())) return true;
                            }
                            console.log(search)
                            return false;
                        })
                        .map((row, index) => {
                            return <li
                                onClick={itemClick}
                                key={row.title}
                                className={`${classes.autocomplete__item} ${selectedIndex === index ? classes.selected : ''}`}
                            >{row.title}</li>
                        })
                        :
                        null
                }
            </ul>
            {search.length > 0 ?(
             <BtnInSearch btnSearch={btnSearch} clearForm={clearForm} />
            ):null}
        </form>
    </>
}