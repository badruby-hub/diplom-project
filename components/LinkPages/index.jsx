import Link from "next/link";
import { FaShoppingCart, FaUserAlt, FaMapMarkerAlt, FaNeos } from "react-icons/fa";
import { SearchForm } from "../SearchForm/Search";
import classes from "./Link.module.css"
import useSWR from "swr";
import { $search } from "@/store/search-product";

const
    pages = [
        { href: '/address', title: <div className={classes.link_icon}><FaMapMarkerAlt className={classes.icon} /> Наш адрес</div> },
        { href: '/authorization', title: <div className={classes.link_icon}><FaUserAlt className={classes.icon} /> Войти</div> },
        { href: '/cart', title: <div className={classes.link_icon}><FaShoppingCart className={classes.icon} /> Корзина</div> },
    ];
    const
    API_URL = "api/product",
    fetcher = async () => {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("fetcher" + res.status);
        return await res.json();
      };

export function PagesWebsite() {
    const
    { data} = useSWR(API_URL,fetcher);
    const
    logoClick =()=>{
        $search.set('');
        
    };
    console.log('Data from PagesWebsite:', data);
    return <header className={classes.header}>
        <nav className={classes.navigation} >
            <div className={classes.icon__logo}>{<Link className={classes.link_icon} href={'/'} onClick={logoClick}>{<FaNeos />}</Link>}</div>
            {data && <SearchForm data={data}/>}
            <ul className={classes.link_form}>
                {pages.map(({ href, title }) =>
                    <li className={classes.link} key={href}>
                        < Link className={classes.link_icon} href={href}>
                            {title}
                        </Link>
                    </li>)}
            </ul>
        </nav>
    </header>
}