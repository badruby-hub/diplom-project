import Link from "next/link";
import classes from "./Button.module.css"
import { FaShoppingCart ,FaRegTrashAlt } from "react-icons/fa";




export function AddForm({addToCart, selectCart}) {

    return (
      <>
           <div className={classes.product__details}>
           {selectCart
            ?<Link className={classes.link_icon}  href={'/cart'}><button className={classes.add__to__cart__button}>Перейти в корзину </button></Link> 
            :<button onClick={addToCart} className={classes.add__to__cart__button}><><FaShoppingCart  className={classes.icon__cart}/> | Добавить в корзину</></button>
             }
            </div>
      </>
    );
  }

  export function DelPost({delPost}) {

    return (
      <>
           
                <button onClick={delPost} className={classes.del__cart__button}><FaRegTrashAlt/></button>
          
      </>
    );
  }


  export function OrderBuy(){
    return <>
       <button className={classes.order__button}>Заказать</button>
    </>
  }