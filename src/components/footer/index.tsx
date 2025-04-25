import Link from "next/link"
import classes from "./Footer.module.css"
import { FaWhatsapp,FaTelegramPlane } from "react-icons/fa";


export  function Footer() {
    return  <nav className={classes.footer__navigation}>
        <section className={classes.buyers}>
            <h3>Покупателям</h3>
            <ul>
                <li className={classes.li}><Link className={classes.link} href={"!#"}>Вопросы и ответы</Link></li>
                <li className={classes.li}><Link className={classes.link} href={"!#"}>Юридическая информация</Link></li>
            </ul>
        </section>
        <section  className={classes.partner}>
            <h3>Партнерам</h3>
                 <ul>
                    <li className={classes.li}>
                        <Link className={classes.link} href={"!#"}>Открыть пункт выдачи</Link>
                    </li>
                    <li className={classes.li}>
                        <Link className={classes.link} href={"!#"}>Предложить помещение</Link>
                    </li>
                    <li className={classes.li}>
                        <Link className={classes.link} href={"!#"}>Развозить грузы</Link>
                    </li>
                    <li className={classes.li}>
                        <Link className={classes.link} href={"!#"}>Доставлять заказы</Link>
                    </li>
                 </ul>
        </section>
        <section  className={classes.company}>
              <h3>Компания</h3>
              <ul>
                <li className={classes.li}>
                    <Link className={classes.link} href={"!#"} >О нас</Link>
                </li>
                <li className={classes.li}>
                    <Link className={classes.link} href={"!#"}>Пресс-служба</Link>
                </li>
                <li>
                    <Link className={classes.link} href={"!#"}>Контакты</Link>
                </li>
                <li className={classes.li}>
                    <Link className={classes.link} href={"!#"}>Вакансии</Link>
                </li>
                <li className={classes.li}>
                    <Link className={classes.link} href={"!#"}>Сообщить о мошенничестве</Link>
                </li>
              </ul>
        </section>
        <section  className={classes.social__icon}>
            <div className={classes.block__qr}>
                <img className={classes.qr}  src="qr.png" alt="qr-code" />
            </div>
            <ul className={classes.block__social}>
                <li className={`${classes.li} ${classes.li__social}`}>
                    <Link className={`${classes.link} ${classes.telegram}`}  href={"https://t.me/Fataliev_n"} target="_blank"><FaTelegramPlane/></Link>
                </li>
                <li className={`${classes.li} ${classes.li__social}`}>
                    <Link className={`${classes.link} ${classes.whatsApp}`}  href={"https://wa.me/79962042066"} target="_blank"><FaWhatsapp/></Link>
                </li>
            </ul>
        </section>
        </nav>
}
