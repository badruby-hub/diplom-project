import classes from "./TableMain.module.css";
import classesCart from "./TableCart.module.css";
import classesProfile from "./TableProfile.module.css";
import { AddForm, DelPost, OrderBuy } from "../Buttons/Buttons";
import Link from "next/link";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { repo } from "remult";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { remult } from "remult";
import { Loader } from "../Spinner";

// import { ErrorInfo } from "../Error";
// import { SizeProduct } from "../../../shared/entities/SizeProduct";



// const fetchSize = async () => {
//     try {
//         return await repo(SizeProduct).find({
//             include: {
//                Product:{
//                    include:{
//                     SizeName:true
//                    }
//                }
//             }
            
//         })
//     } catch (error) {
//         throw error;
//     }
// };


export function TableMain({ data, addToCart, isInCart }) {
    // const
        // { data : sizeProduct, error } = useSWR("sizeProduct", fetchSize);
    //   if(error)return <>{JSON.stringify(error)}</>
    //   if(!sizeProduct) return <>Loading...</>
    //   console.log("Size",sizeProduct?.sizeName);
    const [isOpen, setIsOpen] = useState(null);
    const [visible, setVisible] = useState(null);
    const [paramId, setParamId] = useState(null);
    const openDialog = async (id) => {
        // const productParams = dada.find(param => param.id === id);
        setIsOpen(id);

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
                                        <p className={classes.modal__product__article}>Арт: <Link className={classes.article} href={"#!"}>{obj?.article}</Link></p>
                                        <div className={classes.modal__block__price}>
                                            <p className={`${classes.modal__price__discount} ${classes.modal__product__price}`}><span className={classes.modal__product__value}>{newPrice}₽</span></p>
                                            <p className={classes.modal__price__common}><span className={classes.modal__product__value__common}>{obj.price}₽</span></p>
                                        </div>
                                        <p className={classes.modal__product__gender}>Пол:<span className={classes.gender}> {obj?.gender}</span></p>
                                        <p className={classes.modal__product__color}>Цвет: <span className={classes.color}>{obj?.color}</span></p>
                                        <ul>
                                            <li><button>{obj?.SizeProduct?.SizeName}</button></li>
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
        countPrice = data.reduce((acc, { product }) => acc + product?.price, 0),
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
                <h2> Доставка в пункт назначения </h2>
                <p>{<Link className={classesCart.link__url} href={'/authorization'}>Войти или зарегестрироваться,</Link>} чтобы выбрать доставку </p>
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
    const [status, setStatus] = useState("Loading");
      const [error, setError] = useState();
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
        return <Loader/>


      } else if (status === "Error") {
        return <p>{error}</p>


      } else if (remult.authenticated()) {
        return <main>
        <section className={classesProfile.container__profile}>
           <section className={classesProfile.block__name}>
               <img src="аватар.png" alt="Аватар" className={classesProfile.avatar__img}/>
               <p>{remult.user?.name}</p>   
               <a className="button" href="/api/auth/signout">
                 Выйти
               </a>       
           </section>
           <section className={classesProfile.block__sale}>
            <div>скидка</div>
            <div>Общая сумма покупок</div>
            </section>
           <section  className={classesProfile.block__payment} >
              <h3>Финансы</h3>
             <button>Способ оплаты</button>
             <button>Реквизиты</button>
           </section>
           <section>
            <h3>Управление</h3>
            <button  className={classesProfile.block__settings}>Настройки</button>
            <button  className={classesProfile.block__settings}>Ваши устройства</button>
           </section>
        </section>
        <section className={classesProfile.container__content} >
                 <section className={classesProfile.block__wallet}>
                 <h3>Кошелек</h3>
                 <button>пополнить</button>
                 </section>
                 <section className={classesProfile.block__favorite}>
                    <h3>Избранное</h3>
                    <p>Товаров</p>
                 </section>
                 <section className={classesProfile.block__purchases}>
                      <h3>Покупки</h3>
                      <p>смотреть</p>
                 </section>
                 <section className={classesProfile.block__service}>
                          <h3>Сервис и помощь</h3>
                          <button>Написать в поддержку</button>
                          <button>Вернуть товар</button>
                          <button>Вопросы и ответы</button>
                 </section>
        </section>
        </main>
      } 
}