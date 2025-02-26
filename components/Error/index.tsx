import Link from "next/link"
import classes from "./Error.module.css"

export function ErrorInfo({error}:{error: Error}){
    return <div style={{color: 'red'}}>
               {error.toString()}
    </div>
}

export function EmptyMain({search}:{search:any}){
    return <div className={classes.main__empty}>
               <h1>Ничего не нашлось по запросу {search}</h1>
               <p className={classes.main__empty__text}>Попробуйте поискать по-другому или сократить запрос</p>
               <Link className={classes.link_icon}  href={'/'}><button className={classes.add__to__main__button}>Перейти на главную </button></Link>
    </div>
}

export function EmptyCart(){
    return <div className={classes.cart__empty}>
               <h1>В корзине пока пусто</h1>
               <p className={classes.cart__empty__text}>Загляните на главную страницу, чтобы выбрать товары или найдите нужный товар в поиске</p>
               <Link className={classes.link_icon}  href={'/'}><button className={classes.add__to__cart__button}>Перейти на главную </button></Link>
    </div>
}