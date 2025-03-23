"use client";
import { useEffect, useMemo, useState } from "react";
import classes from "./Search.module.css";
import { BtnInSearch } from "../Buttons/Buttons"
import { $search, $isOpen } from "../../../store/store-data";
import { Product } from "../../../shared/entities/Product";
import { repo, } from "remult";
import { useStore } from "@nanostores/react";

const productRepo = repo(Product);
export function SearchForm() {
    const
        [data, setData] = useState<Product[]>([]);
    useEffect(() => {
        productRepo.find({}).then(setData)
    }, [])
    const
        [sort, setSort] = useState(null),
        search = useStore($search),
        // setSearch = $search.set,
        [isOpen, setIsOpen] = useState<boolean>(true),
        [selectedIndex, setSelectedIndex] = useState<number>(-1),
        sortAndFilterData: Product[] = useMemo(() => {
            return data.filter(row => {
                if (!search.length) return true;
                for (const key in row) {
                    const keyRow = row[key as keyof Product]
                    console.log({ key, row }, keyRow)
                    if (String(keyRow).toLowerCase()?.includes?.(search.toLowerCase())) return true;
                }
                console.log(search)
                return false;
            });
        }, [data, sort, search]),

        itemClick = (event: React.MouseEvent<HTMLElement>) => {
            const textInValue: string | null = event.currentTarget.textContent;
            // setSearch(textInValue);
            $search.set(textInValue || '');
            setIsOpen(!isOpen);
        },
        eventSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < sortAndFilterData.length) {
                    const selectedItem = sortAndFilterData[selectedIndex];
                    if (selectedItem) {
                        // setSearch(selectedItem.title);
                        $search.set(selectedItem.title);
                    }
                } else {
                    $search.set(search);
                }

                setIsOpen(!isOpen);
                setSelectedIndex(-1);
            }

            if (event.key === 'Backspace') {
                setIsOpen(true);
            }
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelectedIndex(prevIndex => Math.min(prevIndex + 1, sortAndFilterData.length - 1));
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
            }
        },
        btnSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            $search.set(search);
            setIsOpen(false);
            setSelectedIndex(-1);
        },
        clearForm = () => {
            $search.set('');
            setSelectedIndex(-1);
        },
        inputClick = () => {
            $isOpen.set(false);
            setIsOpen(true);
            setSelectedIndex(-1);
        };
    console.log('SearchForm', data);
    return <>
        <form className={classes.search__form}>
            <input
                className={classes.search__input}
                value={search}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => $search.set(event.target.value)}
                onClick={inputClick}
                onKeyDown={eventSearch}
            />

            <ul className={classes.autocomplete}>
                {
                    search && isOpen
                        ? sortAndFilterData
                            .filter(row => {
                                if (!search.length) return true;
                                for (const key in row) {
                                    const keyRow = row[key as keyof Product]
                                    console.log({ key, row }, keyRow)
                                    if (String(keyRow).toLowerCase()?.includes?.(search.toLowerCase())) return true;
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
            {search.length > 0 ? (
                <BtnInSearch btnSearch={btnSearch} clearForm={clearForm} />
            ) : null}
        </form>
    </>
}