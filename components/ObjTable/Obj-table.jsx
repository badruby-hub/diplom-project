import classes from "./TableMain.module.css"
import classesCart from "./TableCart.module.css"
import { AddForm, DelPost, OrderBuy } from "../Buttons/Buttons"
import Link from "next/link";


export function TableMain({ data, addToCart, isInCart }) {

    return <main className={classes.product__section}>

        {data.map(obj => <article className={classes.product__article} key={obj.id + Math.random()}>
            <figure className={classes.figure}>
                <img className={classes.product__image} src={obj.images} alt={obj.title} />
                <figcaption className={classes.product__caption}>
                    <p className={classes.product__price}><strong className={classes.storng}>Цена:</strong><span className={classes.product__value}>{obj.price}₽</span></p>
                    <h2 className={classes.product__title}>{obj.title}</h2>
                </figcaption>
            </figure>
            <AddForm selectCart={isInCart(obj.id)} addToCart={() => addToCart(obj)} />
        </article>
        )}
    </main>

}

export function TableCart({ data, delPost }) {

    const
        countPrice = data.reduce((acc, obj) => acc + obj.price, 0),
        discount = Math.round(countPrice * 0.25);
    //переменная для счетчика считать общую сумму  ! 
    console.debug('ObjTable render cart-data', data);
    return <section className={classesCart.product__section}>
        <main className={classesCart.product__main}>
            <section className={classesCart.product}>
                <h2>Корзина</h2>
                {data.map(obj => <article className={classesCart.product__article} key={obj.id}>
                    <figure className={classesCart.figure}>
                        <img className={classesCart.product__image} src={obj.images} alt={obj.title} />
                        <figcaption className={classesCart.product__caption}>
                            <section className={classesCart.product__caption__info}>
                                <h2 className={classesCart.product__title}>{obj.title}</h2>
                                <p className={classesCart.product__price}><strong className={classesCart.product__value}>{obj.price}₽</strong></p>
                            </section>
                            <DelPost delPost={() => delPost(obj.id)} />
                        </figcaption>
                    </figure>
                </article>
                )}
            </section>
            <aside className={classesCart.cart__delivery} >
                <h2>Способ доставки</h2>
                <p>для выбора способа доставки вам нужно {<Link className={classesCart.link__url} href={"/authorization"}>подтвердить аккаунт</Link>}</p>
            </aside>
            <section>
                <aside className={classesCart.cart__pay}>
                    <h2>Способ оплаты</h2>
                    <p>{<Link className={classesCart.link__url} href={'/authorization'}>Войти или зарегестрироваться,</Link>} чтобы выбрать способ оплаты </p>
                </aside>
                <aside className={classesCart.cart__my__details}>
                    <h2>Мои данные</h2>
                    <p>{<Link className={classesCart.link__url} href={'/authorization'}>Войти или зарегестрироваться,</Link>} чтобы оформить заказ</p>
                </aside>
            </section>
        </main>
        <aside className={classesCart.cart__order__form}>
            <h2>К оплате</h2>
            <section className={classesCart.order__count__product}>
                <p>товары: {data.length} шт.</p>
                <span>{countPrice}</span>
            </section>
            <section className={classesCart.order__count__discount}>
                <p>моя скидка</p>
                <span>-{discount}</span>
            </section>
            <section className={classesCart.order__total_amount}>
                <h2>Итого</h2>
                <strong>{countPrice - discount}</strong>
            </section>
            <OrderBuy />
        </aside>
    </section>
}
