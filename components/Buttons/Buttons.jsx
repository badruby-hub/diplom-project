import { useState } from "react";
import classes from "./Button.module.css"

export function InputSearch({ onSearch  }) {
    const [search, setSearch] = useState("");

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        onSearch(event.target.value);
    };

    return(
        <input
        type="text"
        placeholder="Поиск по названию товара"
        value={search}
        onChange={handleSearchChange}
        className={classes.search__input}
    />
    )
}






