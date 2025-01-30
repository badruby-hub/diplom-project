import classes from "./Button.module.css"
import { FiShoppingCart } from "react-icons/fi";




export function AddForm({addPost}) {

    return (
      <>
           <div className={classes.product__details}>
                <button onClick={addPost} className={classes.add__to__cart__button}><FiShoppingCart className={classes.icon__cart}/>| Добавить в корзину</button>
            </div>
      </>
    );
  }