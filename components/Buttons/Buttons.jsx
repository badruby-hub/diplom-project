import Link from "next/link";
import classes from "./Button.module.css"
import { FiShoppingCart } from "react-icons/fi";




export function AddForm({addToCart, selectCart}) {

    return (
      <>
           <div className={classes.product__details}>
           {selectCart
            ?<Link className={classes.link_icon}  href={'/cart'}><button className={classes.add__to__cart__button}>Перейти в корзину </button></Link> 
            :<button onClick={addToCart} className={classes.add__to__cart__button}><><FiShoppingCart className={classes.icon__cart}/> | Добавить в корзину</></button>
             }
            </div>
      </>
    );
  }

  export function DelPost({delPost}) {

    return (
      <>
           <div className={classes.product__details}>
                <button onClick={delPost} className={classes.add__to__cart__button}><FiShoppingCart className={classes.icon__cart}/>| Удалить</button>
            </div>
      </>
    );
  }