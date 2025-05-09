"use client"
import Link from "next/link";
import { FaShoppingCart, FaUserAlt, FaMapMarkerAlt, FaNeos } from "react-icons/fa";
import { SearchForm } from "../SearchForm/Search";
import classes from "./Header.module.css"
import { $filter, $isOpen, $search, $selectedCategoryId } from "../../../store/store-data";
import { BtnAdmin, BurgerBtn } from "../Buttons/Buttons";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { Product } from "../../../shared/entities/Product";
import { remult, repo } from "remult";
import { Category } from "../../../shared/entities/Category";
import Tile, { type TileStatus } from "../../demo/Tile";
import Admin from "@/demo/Admin";






export default function Header() {
    const [data, setData] = useState<Product[]>([]);
    const [status, setStatus] = useState<TileStatus>("Loading");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
    useEffect(() => {
        repo(Product).find({}).then(setData);
    }, []);
    const
        logoClickSearchClear = () => {
            $search.set('');
            $filter.set('');
            $selectedCategoryId.set(null);
        };
    const isClose = () => {
        $isOpen.set(false);
    };
    const isOpen = useStore($isOpen);
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);
    useEffect(() => {
        remult
            .initUser()
            .then(user => {
                setIsAuthenticated(!!user);
                setStatus("Success")
            })
            .catch((e) => {
                setIsAuthenticated(false);
                setStatus("Error");
            })
    }, []);


    const
        pages = [
            { href: '/address', title: <div className={classes.block__icon}><FaMapMarkerAlt className={classes.icon} /> Наш адрес</div> },
            { href: isAuthenticated ? '/authorization' : '/api/auth/signin', title: <div className={classes.block__icon}><FaUserAlt className={classes.icon} /> {isAuthenticated ? 'Данные' : 'Войти'}</div> },
            { href: '/cart', title: <div className={classes.block__icon}><FaShoppingCart className={classes.icon} /> Корзина</div> },
        ];
    return <nav className={classes.navigation}>
       
        <div className={classes.block__logo}>{<Link className={classes.logo__link} href={'/'} onClick={() => { logoClickSearchClear(), isClose(); }}>{<FaNeos className={classes.icon__logo} />}</Link>}</div>
        <BurgerBtn />
        <SearchForm />
        <section className={classes.container__link}>
        <Admin/>
        <ul className={classes.link__ul}>
            {pages.map(({ href, title }) =>
                <li className={classes.link__li} key={href} onClick={isClose}>
                    < Link className={classes.link} href={href}>
                        {title}
                    </Link>
                </li>)}
        </ul>
        </section>
    </nav>
}




export function BurgerMenu() {
    const [data, setData] = useState<Category[]>([]);
    const [status, setStatus] = useState<TileStatus>("Loading");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const isOpen = useStore($isOpen);

    useEffect(() => {
        remult
            .initUser()
            .then(user => {
                setIsAuthenticated(!!user);
                setStatus("Success")
            })
            .catch((e) => {
                setIsAuthenticated(false);
                setStatus("Error");
            })
    }, []);

    const
        burgerMenuLink = [
            { href: '/address', title: "Наш адрес" },
            { href: isAuthenticated ? '/authorization' : '/api/auth/signin', title: <span>{isAuthenticated ? 'Данные' : 'Войти'}</span> },
            { href: '/cart', title: "Корзина" },
        ];


    const isClose = () => {
        const toggle = $isOpen.get()
        $isOpen.set(!toggle);
    };
    useEffect(() => {
        repo(Category).find({}).then(setData)
    }, []);
    return <>
        <nav className={isOpen ? classes.burger__navigation : classes.burger__animation__close}>
            <ul className={isOpen ? classes.burger__ul__visibility : classes.burger__ul__hidden}>
                {burgerMenuLink.map(({ href, title }) =>
                    <li className={classes.burger__li__link} key={href} onClick={isClose}>
                        < Link className={classes.link} href={href}>
                            {title}
                        </Link>

                    </li>
                )}
                {data.map(obj => (
                    <li className={classes.burger__li} key={obj.id} onClick={() => {
                        $selectedCategoryId.set(obj.id);
                        $search.set('');
                        $filter.set('');
                        isClose();
                    }}>
                        {obj.category}
                    </li>
                ))}
            </ul>
        </nav>
        <aside className={isOpen ? classes.burger__bg__visibility : classes.burger__bg__hidden} onClick={isClose}>
        </aside>
    </>
}