import classes from "./TableMain.module.css";
import classesCart from "./TableCart.module.css";
import { AddForm, DelPost, OrderBuy } from "../Buttons/Buttons";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { repo } from "remult";
import { ProductParams } from "../../../shared/entities/ProductParams";
import useSWR from "swr";
import { ErrorInfo } from "../Error";



const fetchParams = async () => {
    try {
      return await repo(ProductParams).find({
      })
    } catch (error) {
      throw error;
  }
};


export function TableMain({ data, addToCart, isInCart }) {
    const [isOpen, setIsOpen] = useState(null);
    const [visible, setVisible] = useState(null);
    const [paramId, setParamId] = useState(null);
    // const [sizeId, setSizeId] = useState();
    const { data: parameter,error } = useSWR('productParams', fetchParams);
        if (error) return  <ErrorInfo />
        if (!parameter) return
    const openDialog = async (id) => {
        const productParams = parameter.find(param => param.id === id);
        // const sizes = productParams.Size;
        setIsOpen(id);
        setParamId(productParams);
        // setSizeId(sizes);
        console.log('ProductParams',productParams);
        // console.log('ProductParams size',  );
    };

    const closeDialog = () => {
        setIsOpen(null);
    };
    return <main className={classes.cards}>
        <section className={`${classes.container} ${classes.container__cards}`}>
            {data.map(obj => {
                const
                    discount = Math.round(obj.price * 0.10),
                    newPrice = Math.round(obj.price - discount),
                    discountPercentage = Math.floor(((obj.price - newPrice) / obj.price) * 100);
                return <article onMouseEnter={() => setVisible(obj.id)} onMouseLeave={() => setVisible(null)} className={classes.card} key={obj.id + Math.random()}>
                    <section className={classes.card__top}>
                        <Link href="#!" className={classes.card__img}>
                            <img src={obj.images} alt={obj.title} />
                        </Link>
                        <span className={classes.card__label}>-{discountPercentage}%</span>
                    </section>
                    <section className={classes.card__bottom}>
                        <div className={classes.card__prices}>
                            <span className={`${classes.card__price} ${classes.card__price__discount}`}>{newPrice}</span>
                            <span className={`${classes.card__price} ${classes.card__price__common}`}>{obj.price}</span>
                        </div>
                        <Link href="#!" className={classes.card__title}>{obj.title}</Link>
                    </section>
                    <AddForm selectCart={isInCart?.(obj.id)} addToCart={() => addToCart(obj)} />
                    <button className={classes.btn__modal__open} onClick={() => openDialog(obj.id)}> Быстрый просмотр </button>
                    <Dialog open={isOpen === obj.id} onClose={closeDialog}>
                        <div className={classes.modal__bg}>
                            <DialogPanel className={classes.popup}>
                                <FaTimes className={classes.modal__btn__close} onClick={closeDialog} />
                                <section className={classes.modal__block__section} >
                                    <div className={classes.modal__block__img}><img src={obj.images} alt={obj.title} /></div>
                                    <div className={classes.modal__block__content}>
                                        <DialogTitle className={classes.modal__title}>
                                            {obj.title}
                                        </DialogTitle>
                                        <p className={classes.modal__product__article}>Арт: <Link className={classes.article} href={"#!"}>{paramId?.article}</Link></p>
                                        <div className={classes.modal__block__price}>
                                            <p className={`${classes.modal__price__discount} ${classes.modal__product__price}`}><span className={classes.modal__product__value}>{newPrice}₽</span></p>
                                            <p className={classes.modal__price__common}><span className={classes.modal__product__value__common}>{obj.price}₽</span></p>
                                        </div>
                                        <p className={classes.modal__product__gender}>Пол:<span className={classes.gender}> {paramId?.gender}</span></p>
                                        <p className={classes.modal__product__color}>Цвет: <span className={classes.color}>{paramId?.color}</span></p>
                                       <ul>
                                          <li><button>{paramId?.sizeId}</button></li>
                                       </ul>
                                    </div>
                                </section>
                            </DialogPanel>
                        </div>
                    </Dialog>
                </article>
            }
            )}
        </section>
    </main >
}




export function TableCart({ data, delPost }) {

   
    const
    countPrice = data.reduce((acc, {product}) => acc + product?.price, 0),
    discount = Math.round(countPrice * 0.25);
    //переменная для счетчика считать общую сумму  ! 
    return <section className={classesCart.product__section}>
        <main className={classesCart.product__main}>
            <section className={classesCart.product}>
                <h2>Корзина</h2>
                {data.map(obj => <article className={classesCart.product__article} key={obj.product?.title}>
                    <figure className={classesCart.figure}>
                        <img className={classesCart.product__image} src={obj.product?.images} alt={obj.product?.title} />
                        <figcaption className={classesCart.product__caption}>
                            <section className={classesCart.product__caption__info}>
                                <h2 className={classesCart.product__title}>{obj.product?.title}</h2>
                                <p className={classesCart.product__price}><strong className={classesCart.product__value}>{obj.product?.price}₽</strong></p>
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

export function TableProfile() {
    return <>
        <h1>данные пользователя </h1>
    </>
}