import classes from "./pagination.module.css";

export function Pagination({ countPerPage, totalItem, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItem / countPerPage); i++){
        pageNumbers.push(i)
    }
        return <div>
               <ul className={classes.pagination}>
                    {
                        pageNumbers.map(number =>(
                            <li key={number}>
                             <button className={classes.page__item} onClick={()=>paginate(number)}>{number}</button>    
                            </li>
                        ))
                    }
               </ul>
        </div>
}