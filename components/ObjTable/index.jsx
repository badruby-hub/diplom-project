import classes from "./ObjTable.module.css"



export function ObjTable({ data }) {
    console.debug('ObjTable render', data);
    return <section className={classes.product__section}>
    {data.map(obj => <article className={classes.product__article} key={obj.id}>
        <figure className={classes.figure}>
        <img className={classes.product__image} src={obj.images} alt={obj.title} />
        <figcaption className={classes.product__caption}>
            <h2 className={classes.product__title}>{obj.title}</h2>
        </figcaption>
        </figure>
        <div className={classes.product__details}>
            <p className={classes.product__price}><strong>Цена:</strong><span className={classes.product__value}>{obj.price}</span></p>
            <button className={classes.add__to__cart__button}>Добавить в корзину</button>
        </div>
    </article>

)}
</section>
}

