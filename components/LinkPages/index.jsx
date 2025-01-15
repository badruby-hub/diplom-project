import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const 
    pages = [
      {href: '/', title:'Главная'},
      {href: '/shopping-cart', title:'Корзина'},
    ];

export function PagesWebsite() {
    return  <nav>
        <ul>
           {pages.map(({href, title})=>
           <li key={href}>
            < Link href={href}>
            {title}
            </Link>
           </li>)}
        </ul>
    </nav>
}