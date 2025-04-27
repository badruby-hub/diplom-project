import classes from "./TableMain.module.css";
import classesCart from "./TableCart.module.css";
import classesProfile from "./TableProfile.module.css";
import { AddForm, DelPost, OrderBuy } from "../Buttons/Buttons";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { remult } from "remult";
import { Loader } from "../Spinner";


export function TableMain({ data, addToCart, isInCart }) {
    const [isOpenFastView, setIsOpenFastView] = useState(null);
    const [isOpenListSize, setIsOpenListSize] = useState(false);
    const [visible, setVisible] = useState(null);
    const [selected, setSelected] = useState(null)
    const openDialog = async (id) => {
        setIsOpenFastView(id);
    };


    const closeDialog = () => {
        setIsOpenFastView(null);
    };
    return <section className={`${classes.container} ${classes.container__cards}`}>
        {data.map(obj => {
            const
                discount = Math.round(obj.price * 0.10),
                newPrice = Math.round(obj.price - discount),
                discountPercentage = Math.floor(((obj.price - newPrice) / obj.price) * 100);
            return <article onMouseEnter={() => setVisible(obj.id)} onMouseLeave={() => setVisible(null)} className={classes.card} key={obj.article + Math.random()}>
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
                <Dialog open={isOpenFastView === obj.id} onClose={closeDialog}>
                    <div className={classes.modal__bg}>
                        <DialogPanel className={classes.popup}>
                            <FaTimes className={classes.modal__btn__close} onClick={closeDialog} />
                            <section className={classes.modal__block__section} >
                                <div className={classes.modal__block__img}><img src={obj.images} alt={obj.title} /></div>
                                <div className={classes.modal__block__content}>
                                    <DialogTitle className={classes.modal__title}>
                                        {obj.title}
                                    </DialogTitle>
                                    <p className={classes.modal__product__article}>Арт: <Link className={classes.article} href={"#!"}>{obj?.article}</Link></p>
                                    <div className={classes.modal__block__price}>
                                        <p className={`${classes.modal__price__discount} ${classes.modal__product__price}`}><span className={classes.modal__product__value}>{newPrice}₽</span></p>
                                        <p className={classes.modal__price__common}><span className={classes.modal__product__value__common}>{obj.price}₽</span></p>
                                    </div>
                                    <p className={classes.modal__product__gender}>Пол:<span className={classes.gender}> {obj?.gender}</span></p>
                                    <p className={classes.modal__product__color}>Цвет: <span className={classes.color}>{obj?.color}</span></p>
                                    <section className={classes.container__sizes}>
                                        <button className={classes.btn__modal__table__size} onClick={() => setIsOpenListSize(true)}>Таблица Размеров</button>

                                        <ol className={classes.sizes__list}>
                                            {obj?.sizeProduct.map(siz => {
                                                return <>
                                                    <li
                                                        onClick={() => setSelected(siz.sizeName.size)}
                                                        className={`${classes.block__size} ${selected === siz.sizeName.size ? classes.selected : ''}`}
                                                        key={siz?.sizeName.size + Math.random()}> {siz?.sizeName.size} <span className={classes.size__name} >{siz?.sizeName.size}</span></li>
                                                </>
                                            }
                                            )}
                                        </ol>
                                    </section>
                                    <AddForm className={classes.btn__fast__view} selectCart={isInCart?.(obj.id)} addToCart={() => addToCart(obj)} />
                                </div>
                            </section>
                        </DialogPanel>
                    </div>
                </Dialog>
            </article>
        }
        )}
    </section>
}




export function TableCart({ data, delPost }) {


    const
        countPrice = data.reduce((acc, { product }) => acc + product?.price, 0),
        discount = Math.round(countPrice * 0.10);
    //переменная для счетчика считать общую сумму  ! 
    return <section className={classesCart.product__section}>
        <main className={classesCart.product__main}>
            <section className={classesCart.product}>
                <h2>Корзина</h2>
                {data.map(obj => <article className={classesCart.product__article} key={obj.product?.title + Math.random()}>
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
                <h2>Доставка в пункт выдачи</h2>
                <p>Саратовская область, Энгельс, Одесская улица, 75,  (Пункт выдачи), Ежедневно 10:00 – 21:00 </p>
            </aside>
            <section>
                <aside className={classesCart.cart__pay}>
                    <h2>Способ оплаты</h2>
                    <p>Кошелёк: 0 ₽</p>
                </aside>
                <aside className={classesCart.cart__my__details}>
                    <h2>Мои данные</h2>
                    <p>{remult?.user?.name}</p>
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
    const [status, setStatus] = useState("Loading");
    const [error, setError] = useState();
    const [isOpenModalLk, setIsOpenModalLk] = useState(false);

    useEffect(() => {
        remult
            .initUser()
            .then(() => setStatus("Success"))
            .catch((e) => {
                setStatus("Error");
                if (e.message.includes("the server configuration")) {
                    setError(
                        <>
                            Make sure to set the <code>AUTH_SECRET</code> in the{" "}
                            <code>.env</code> file. <br />
                            Read more at{" "}
                            <a href="https://errors.authjs.dev#missingsecret">auth.js docs</a>
                            .
                            <br />
                            Please check the server terminal console for more information.
                        </>,
                    );
                }
            });
    }, []);

    if (status === "Loading") {
        return <Loader />


    } else if (status === "Error") {
        return <p>{error}</p>


    } else if (remult.authenticated()) {
        return <section className={classesProfile.container}>
            <section className={classesProfile.container__profile}>
                <section className={classesProfile.block__name}>
                    <div className={classesProfile.avatar}><p className={classesProfile.avatar__name__latter} >{remult.user?.name?.charAt(0)}</p></div>
                    <p className={classesProfile.avatar__name} onClick={() => setIsOpenModalLk(true)}>{remult.user?.name}</p>
                    <Dialog className={classesProfile.modal__dialog} open={isOpenModalLk} onClose={() => setIsOpenModalLk(false)}>
                        <div className={classesProfile.modal__cloud}>
                            <DialogPanel className={classesProfile.modal__lk__popup}>
                                <div className={classesProfile.block__modal__form}>
                                    <DialogTitle>Личные данные</DialogTitle>
                                    <form method="post" className={classesProfile.modal__form}>
                                        <ul>
                                            <li>
                                                <label htmlFor="item.FirstName">
                                                    <span>Имя</span>
                                                </label>
                                                <input className={classesProfile.modal__input} type="text" id="item.FirstName" value={remult.user?.name} />
                                            </li>
                                        </ul>
                                        <FaTimes onClick={() => setIsOpenModalLk(false)} className={classes.modal__btn__close} />
                                    </form>
                                    <button className={classesProfile.modal__btn__save} type="button">Сохранить</button>
                                </div>
                                <div className={classesProfile.popup__footer}>
                                    <Link className="button" href="/api/auth/signout">
                                        Выйти
                                    </Link>
                                    <span>
                                        Удалить профиль
                                    </span>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
                </section>
                <section className={classesProfile.block__sale}>
                    <div className={`${classesProfile.content} ${classesProfile.discount}`}><span>скидка</span>
                        10%
                    </div>
                    <div className={`${classesProfile.content} ${classesProfile.summ}`}>Общая сумма покупок</div>
                </section>
                <section className={classesProfile.block__payment} >
                    <h4 className={classesProfile.zagolovok}>Финансы</h4>
                    <div className={classesProfile.section__lk}>
                        <div className={classesProfile.content}>Способ оплаты</div>
                        <div className={classesProfile.content}>Реквизиты</div>
                    </div>
                </section>
                <section className={classesProfile.block__settings}>
                    <h4 className={classesProfile.zagolovok}>Управление</h4>
                    <div className={classesProfile.section__lk}>
                        <div className={classesProfile.content}>Настройки</div>
                        <div className={classesProfile.content}>Ваши устройства</div>
                    </div>

                </section>
            </section>
            <section className={classesProfile.container__content} >
                <section className={classesProfile.block__content__top}>
                    <section className={classesProfile.block__wallet}>
                        <section className={classesProfile.block__balance}>
                            <h3 className={classesProfile.zagolovok__content}>0 ₽</h3>
                            <div>Кошелек</div>
                        </section>
                        <button className={classesProfile.up__balance} >пополнить</button>
                    </section>
                    <section className={classesProfile.block__installment}>
                        <h3 className={classesProfile.zagolovok__content}>40 000 ₽</h3>
                        <div>Лимит на оплату частями</div>
                    </section>
                </section>
                <section className={classesProfile.wrapper}>
                    <section className={classesProfile.block__favorite}>
                        <h3 className={classesProfile.zagolovok__content}>Избранное</h3>
                        <div><p>29</p>Товаров</div>
                    </section>
                    <section className={classesProfile.block__purchases}>
                        <h3 className={classesProfile.zagolovok__content}>Покупки</h3>
                        <p>смотреть</p>
                    </section>
                </section>
                <section className={classesProfile.block__service}>
                    <h3 className={classesProfile.zagolovok__content}>Сервис и помощь</h3>
                    <section className={classesProfile.block__btn__service}>
                        <div className={classesProfile.content}>Написать в поддержку</div>
                        <div className={classesProfile.content}>Вернуть товар</div>
                        <div className={classesProfile.content}>Вопросы и ответы</div>
                    </section>

                </section>
            </section>
        </section>
    }
}