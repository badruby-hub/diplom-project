import {atom} from "nanostores"

/*
 Текущее значение строки поиска 
 */

export const $search= atom<string>('');

/*
 Активный фильтр используется для отображения продуктов 
 */

export const $filter= atom<string>('');

/*
Статус Бургер меню
 */

export const $isOpen = atom<boolean>(false);


/*выделение id категории */

export const $selectedCategoryId = atom<number | null>(null);