import classes from "./TableMain.module.css"
import {AddForm,DelPost} from "../Buttons/Buttons"

export function TableMain({ data,addToCart,isInCart }) {
    
    console.debug('ObjTable render main-data', data);
    return <main className={classes.product__section}>
        {data.map(obj => <article className={classes.product__article} key={obj.id}>
            <figure className={classes.figure}>
                <img className={classes.product__image} src={obj.images} alt={obj.title} />
                <figcaption className={classes.product__caption}>
                    <p className={classes.product__price}><strong className={classes.storng}>Цена:</strong><span className={classes.product__value}>{obj.price}₽</span></p>
                    <h2 alt={obj.title} className={classes.product__title}>{obj.title}</h2>
                </figcaption>
            </figure>
             <AddForm selectCart={isInCart(obj.id)}  addToCart={() => addToCart(obj)}/>
        </article>
        )}
    </main>
}


export function TableCart({ data,delPost  }) {
    
    console.debug('ObjTable render cart-data', data);
    return <main className={classes.product__section}>
        {data.map(obj => <article className={classes.product__article} key={obj.id}>
            <figure className={classes.figure}>
                <img className={classes.product__image} src={obj.images} alt={obj.title} />
                <figcaption className={classes.product__caption}>
                    <p className={classes.product__price}><strong>Цена:</strong><span className={classes.product__value}>{obj.price}₽</span></p>
                    <h2 alt={obj.title} className={classes.product__title}>{obj.title}</h2>
                </figcaption>
            </figure>
             <DelPost  delPost={() => delPost(obj.id)}/>
        </article>

        )}
    </main>
}
