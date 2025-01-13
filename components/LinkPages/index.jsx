import Link from "next/link";


const 
    pages = [
      {href: '/', title:'Главная'},
      {href: '/shopping-cart', title:'Корзина'},
    ];

export function PagesWebsite() {
    return <header>
    <nav>
        <ul>
           {pages.map(({href, title})=>
           <li key={href}>
            < Link href={href}>
            {title}
            </Link>
           </li>)}
        </ul>
    </nav>
    </header>
}