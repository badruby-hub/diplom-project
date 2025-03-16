import Link from "next/link";
import { FaShoppingCart, FaUserAlt, FaMapMarkerAlt, FaNeos } from "react-icons/fa";
import { SearchForm } from "../SearchForm/Search";
import classes from "./Link.module.css"
import useSWR from "swr";
import { $isOpen, $search } from "@/store/store-data";
import { BurgerBtn } from "../Buttons/Buttons";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";


const
    pages = [
        { href: '/address', title: <div className={classes.block__icon}><FaMapMarkerAlt className={classes.icon} /> Наш адрес</div> },
        { href: '/authorization', title: <div className={classes.block__icon}><FaUserAlt className={classes.icon} /> Войти</div> },
        { href: '/cart', title: <div className={classes.block__icon}><FaShoppingCart className={classes.icon} /> Корзина</div> },
    ];

const
    API_URL = "/api/product",
    CATEGORY_URL = "/api/category",
    fetcher = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error("fetcher" + res.status);
        return await res.json();
    };
export function PagesWebsite() {
    const
        { data } = useSWR(API_URL, fetcher);
    const
        logoClick = () => {
            $search.set('');
        };
    const isClose = () => {
        $isOpen.set(false);
    };
    return <header className={classes.header}>
        <nav className={classes.navigation} >
            <div className={classes.block__logo}>{<Link className={classes.logo__link} href={'/'} onClick={() => { logoClick(); isClose(); }}>{<FaNeos className={classes.icon__logo} />}</Link>}</div>
            {<BurgerBtn />}
            {data && <SearchForm data={data} />}
            <ul className={classes.link__ul}>
                {pages.map(({ href, title }) =>
                    <li className={classes.link__li} key={href} onClick={isClose}>
                        < Link className={classes.link} href={href}>
                            {title}
                        </Link>
                    </li>)}
            </ul>
        </nav>
    </header>
}



const
    burgerMenuLink = [
        { href: '/address', title: < Link className={classes.burger__link} href={'/address'}> Наш адрес </Link> },
        { href: '/authorization', title: <Link className={classes.burger__link} href={'/authorization'}>Войти</Link> },
        { href: '/cart', title: < Link className={classes.burger__link} href={'/cart'}>Корзина</Link> },
    ];


export function BurgerMenu() {
    const isOpen = useStore($isOpen);
    const isClose = () => {
        const toggle = $isOpen.get()
        $isOpen.set(!toggle);
    };
    const
        { data } = useSWR(CATEGORY_URL, fetcher);
    if (!data) {
        return null
    }
    console.log("burger menu data", data);
    return <>
        <nav className={isOpen ? classes.burger__navigation : classes.burger__animation__close}>
            <ul className={classes.burger__ul}>
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
        <aside className={isOpen ? classes.background : null} onClick={isClose}>
        </aside>
    </>
}