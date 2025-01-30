import { useMemo, useState } from "react";
import classes from "./Search.module.css";
import { FaSearch, FaTimes } from "react-icons/fa";

export function SearchForm({ data }) {
    console.log('SearchForm',data);
    const
        [sort, setSort] = useState(null),
        [search, setSearch] = useState(''),
        [isOpen, setIsOpen] = useState(true),
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
            setSearch(event.target.textContent)
            setIsOpen(!isOpen)
        },
    inputClick = () => {
        setIsOpen(true)
    };
    console.debug('ObjTable render');
    return <>
        <form className={classes.search__form}>
            <input
                className={classes.search__input}
                value={search}
                onInput={event => setSearch(event.target.value)}
                onClick={inputClick} />
            <ul className={classes.autocomplete}>
                {
                    search && isOpen
                        ? sortAndFilterData
                        .filter(row => {
                            if (!search.length) return true;
                            for (const key in row) {
                                console.log({ key, row }, row[key]?.includes)
                                if (String(row[key]).toLowerCase()?.includes?.(search.toLowerCase())) return true;
                            }
                            console.log(search)
                            return false;
                        })
                        .map((row) => {
                            return <li
                                onClick={itemClick}
                                key={row.title}
                                className={classes.autocomplete__item}
                            >{row.title}</li>
                        })
                        :
                        null
                }
            </ul>
            <div className={classes.block_btn_search} >
                    <div className={classes.block_icon_search}>{<FaTimes className={classes.icon_search} />}</div>
                    <div className={classes.block_icon_search}>{<FaSearch className={classes.icon_search} />}</div>
                </div>
        </form>
    </>
}