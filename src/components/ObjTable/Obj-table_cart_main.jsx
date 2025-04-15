import classes from "./style.module.css";
import classesCart from "./TableCart.module.css";
import { AddForm, DelPost, OrderBuy } from "../Buttons/Buttons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { repo } from "remult";
import { ProductParams } from "../../../shared/entities/ProductParams";
import { Product } from "../../../shared/entities/Product";
import useSWR from "swr";
import { ErrorInfo } from "../Error";



export function TableMain({ data, addToCart, /*isInCart*/ }) {
    const [params, setParams] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [visible, setVisible] = useState(null);
    const [parameter, setParameter] = useState([]);
    useEffect(() => {
        const fetchParams = async () => {
            try {
                const result = await repo(ProductParams).find({})
                setParams(result);
            } catch (error) {
                console.error("Error fetching product parameters:", error);
            }
        };
        fetchParams();
    }, []);
    const openDialog = async (id) => {
        const productParams = params.find(param => param.id === id);
        setIsOpen(id);
        setParameter(productParams);
        console.log(productParams);
    };

    const closeDialog = () => {
        setIsOpen(null);
    };
    return <main className={classes.cards}> 
    <section className={`${classes.container} ${classes.container__cards}`}>
        {data.map(obj => <article onMouseEnter={() => setVisible(obj.id)} onMouseLeave={() => setVisible(null)} className={classes.card} key={obj.id + Math.random()}>
            <section className={classes.card__top}>
                <Link href="#!" className={classes.card__img}>
                    <img  src={obj.images} alt={obj.title} />
                </Link>
                <span className={classes.card__label}>-10%</span>
            </section>
            <section className={classes.card__bottom}>
                <div className={classes.card__prices}>
                    <span className={`${classes.card__price} ${classes.card__price__discount}`}>1200</span>
                    <span className={`${classes.card__price} ${classes.card__price__common}`}>{obj.price}</span>
                </div>
                <Link href="#!" className={classes.card__title}>{obj.title}</Link>
            </section>
            <AddForm /*selectCart={isInCart(obj.id)}*/ addToCart={() => addToCart(obj)} />
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
                                <div>
                                    <p className={classes.modal__product}><span className={classes.modal__product__params}>{parameter.gender}</span></p>
                                </div>
                                <p className={classes.modal__product__price}><span className={classes.modal__product__value}>{obj.price}₽</span></p>
                                <div>
                                    <p className={classes.modal__product__price}>Цвет:<span className={classes.modal__product__color}>{parameter.color}</span></p>
                                </div>
                            </div>
                        </section>
                    </DialogPanel>
                </div>
            </Dialog>
        </article>
        )}
    </section>
    </main>
}




export function TableCart({ data, delPost }) {
    const fetchData = async () => {
        try {
            const productIds = data.map(item => item.productId);
            console.log('ObjTable render cart-data', productIds);
            const products = await
                repo(Product)
                    .find({
                        where: { id: productIds }
                    });
            console.log('ObjTable render cart-data', products);
            return products

        } catch (error) {
            throw error;
        }
    };
    const { data: productData, error } = useSWR('product', fetchData, { revalidateOnFocus: true });
    if (error) return <>
        <ErrorInfo />
    </>;
    if (!productData) return
    const
        countPrice = productData.reduce((acc, obj) => acc + obj.price, 0),
        discount = Math.round(countPrice * 0.25);
    //переменная для счетчика считать общую сумму  ! 
    console.debug('ObjTable render cart-data', productData);
    return <section className={classesCart.product__section}>
        <main className={classesCart.product__main}>
            <section className={classesCart.product}>
                <h2>Корзина</h2>
                {productData.map(obj => <article className={classesCart.product__article} key={obj.id}>
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

export function TableProfile() {
    return <>
        <h1>данные пользователя </h1>
    </>
}