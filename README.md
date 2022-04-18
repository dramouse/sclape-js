# В РАЗРАБОТКЕ

## Sclape - too easy way to work with DOM events and reactive values with no validation break

Sclape - это библиотека для создания событий и добавления реактивных значений
в DOM элеметы через data атрибуты.

## Инициализация Sclape на странице

Запустить sclape очень просто

```js
import Sclape from 'sclape';
import inputHandler from './script.js';

// функции-обработчики первым аргументом всегда принимают event
function handlerFuntion (event) {
  console.log(event.target);
}

// 1. Создайте экземпляр Sclape и поместите в него объект
const sclape = new Sclape({
  // 2. Если хотите использовать события sclape, в поле handlers поместите
  // все функции обработчики, указанные в элементах DOM'a
  handlers: {
    handlerFunction,
    inputHanlder,
  },
  // 3. Если хотите использовать реактивные значения sclape, в поле data
  // поместите все значения, используемые в элементах DOM
  data: {
    primitiveVar,
    htmlVar
  }
});

// 4. Инициализируйте события Sclape (если хотите их использовать)
sclape.initEvents();

// 5. Создайте хранилище sclape (если хотите его использовать)
const store = sclape.initStore();
```
Готово!
Теперь события на вашей странице обрабатываются, и вы можете пользоваться хранилищем реактивных значений

## События

Для добавления событий в DOM дерево используется:
*data-event="function"*

event - тип события, function - функция-обработчик, помещенная в объект Sclape при инициализации

```html
<div data-click="handlerFunction"></div>
<div data-input="inputHandler"></div>
```

Поддерживаются события *click*, *input*, *blur*, *focus*

## Реактивные значения

Для добавления реактивных значений в DOM дерево используются:
*data-sclape-value="variable"* - для простых значений
*data-sclape-html="variable"* - для вставки html

variable - переменная, помещенная в data объекта Sclape при инициализации

```html
<div data-sclape-value="primitiveVariable"></div>
<div data-sclape-html="htmlValue"></div>
```

## Управление реактивными значениями

Для получения реактивных значений и их изменения используется хранилище Sclape:
