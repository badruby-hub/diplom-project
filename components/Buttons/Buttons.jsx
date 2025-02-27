import Link from "next/link";
import classes from "./Button.module.css"
import { FaShoppingCart ,FaRegTrashAlt,FaSearch, FaTimes } from "react-icons/fa";
import { useState } from "react";
import {BurgerMenu}from '../LinkPages/index';

export function BtnInSearch({clearForm, btnSearch}) {

  return  <div className={classes.block_btn_search} >
            {/* кнопка очистки */}<div className={classes.block_icon_search}>{<FaTimes className={classes.icon_search} onClick={clearForm}/>}</div>
            {/* кнопка поиска  */}<div className={classes.block_icon_search}>{<FaSearch className={classes.icon_search} onClick={btnSearch}/>}</div>
          </div>
}

export function BurgerBtn(){
  const 
     [open,setOpen] = useState(false);
  const btnClick = ()=>{
        setOpen(prevOpen=> !prevOpen);
     };
  return <div onClick={btnClick} className={classes.burger__btn}>
            <span></span>
            <span></span>
            <span></span>
            {open && <BurgerMenu className={classes.burger__menu}/>}
          </div>
}

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

    return    <>
                <button onClick={delPost} className={classes.del__cart__button}><FaRegTrashAlt/></button>
      </>
  }


  export function OrderBuy(){
    return <>
       <button className={classes.order__button}>Заказать</button>
    </>
  }