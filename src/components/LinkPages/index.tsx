"use client"
import Link from "next/link";
import { FaShoppingCart, FaUserAlt, FaMapMarkerAlt, FaNeos } from "react-icons/fa";
import { SearchForm } from "../SearchForm/Search";
import classes from "./Link.module.css"
import useSWR from "swr";
import { $isOpen, $search } from "../../../store/store-data";
import { BurgerBtn } from "../Buttons/Buttons";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { Product } from "../../../shared/entities/Product";
import { repo } from "remult";
import { Category } from "../../../shared/entities/Category";

const productRepo = repo(Product);
const categoryRepo = repo(Category);

const
    pages = [
        { href: '/address', title: <div className={classes.block__icon}><FaMapMarkerAlt className={classes.icon} /> Наш адрес</div> },
        { href: '/authorization', title: <div className={classes.block__icon}><FaUserAlt className={classes.icon} /> Войти</div> },
        { href: '/cart', title: <div className={classes.block__icon}><FaShoppingCart className={classes.icon} /> Корзина</div> },
    ];



export default function PagesWebsite() {
    const [data, setData] = useState<Product[]>([]);
    useEffect(() => {
        productRepo.find({}).then(setData)
    }, [])
    const
        logoClickSearchClear = () => {
            $search.set('');
        };
    const isClose = () => {
        $isOpen.set(false);
    };
    console.log("PagesWebsite", data);
    return <nav className={classes.navigation}>
        <div className={classes.block__logo}>{<Link className={classes.logo__link} href={'/'} onClick={() => { logoClickSearchClear(), isClose(); }}>{<FaNeos className={classes.icon__logo} />}</Link>}</div>
        {<BurgerBtn />}
        {<SearchForm />}
        <ul className={classes.link__ul}>
            {pages.map(({ href, title }) =>
                <li className={classes.link__li} key={href} onClick={isClose}>
                    < Link className={classes.link} href={href}>
                        {title}
                    </Link>
                </li>)}
        </ul>
    </nav>
}



const
    burgerMenuLink = [
        { href: '/address', title: < Link className={classes.burger__link} href={'/address'}> Наш адрес </Link> },
        { href: '/authorization', title: <Link className={classes.burger__link} href={'/authorization'}>Войти</Link> },
        { href: '/cart', title: < Link className={classes.burger__link} href={'/cart'}>Корзина</Link> },
    ];


export function BurgerMenu() {
    const [data, setData] = useState<Category[]>([]);
    const isOpen = useStore($isOpen);
    const isClose = () => {
        const toggle = $isOpen.get()
        $isOpen.set(!toggle);
    };
    useEffect(() => {
        categoryRepo.find({}).then(setData)
    }, [])
    console.log("burger menu data", data);
    return <>
        <nav className={isOpen ? classes.burger__navigation : classes.burger__animation__close}>
            <ul className={isOpen ? classes.burger__ul__visibility : classes.burger__ul__hidden}>
                {burgerMenuLink.map(({ href, title }) =>
                    <li className={classes.burger__li__link} key={href} onClick={isClose}>
                        {title}
                    </li>
                )}
                {data.map(obj => (
                    <li className={classes.burger__li} key={obj.id} onClick={isClose}>
                         {obj.category}
                    </li>
                ))}
            </ul>
        </nav>
        <aside className={isOpen ? classes.burger__bg__visibility : classes.burger__bg__hidden} onClick={isClose}>
        </aside>
    </>
}