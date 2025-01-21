import Link from "next/link";
// import { FaShoppingCart } from "react-icons/fa";
import  {InputSearch} from "../Buttons/Buttons"


const
    pages = [
        { href: '/', title: 'Главная' },
        { href: '/shopping-cart', title: 'Корзина' },
    ];



export function PagesWebsite({ handleSearchChange,onSearch  }) {
    return <header>
        <InputSearch onSearch={onSearch} onChange={handleSearchChange}/>
        <nav>
            <ul>
                {pages.map(({ href, title }) =>
                    <li key={href}>
                        < Link href={href}>
                            {title}
                        </Link>
                    </li>)}
            </ul>
        </nav>
    </header>
}