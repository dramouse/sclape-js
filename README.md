## Sclape - too easy way to work with DOM events and reactive values with no validation break

Sclape - это библиотека для создания событий и добавления реактивных значений
в DOM элеметы через data атрибуты.

## Инициализация Sclape на странице

Запустить sclape очень просто

```js
import Sclape from 'sclape';

const sclape = new Sclape({
  // 1. Если хотите использовать события
  handlers: {
    clickHandlerFunction,
    inputHandlerFunction,
  },
  // 2. Если хотите использовать реактивные значения
  data: {
    primitiveVariable, // 12
    htmlVariable // <div class="some-class">Hey</div>
  }
});

// 3. Инициализация событий Sclape (если хотите их использовать)
sclape.initEvents();

// 4. Создание хранилища sclape (если хотите его использовать)
const store = sclape.initStore();
```
Готово!
Теперь события на вашей странице обрабатываются, и вы можете пользоваться хранилищем реактивных значений

Для удаления всех событий sclape используйте:
```js
sclape.removeEvents();
```

## События

Для добавления событий в DOM дерево используется:
*data-sclape-on="event:function"*

event - тип события, function - функция-обработчик, помещенная в объект Sclape при инициализации

```html
<div data-sclape-on="click:clickHandlerFunction"></div>
<div data-sclape-on="input:inputHandlerFunction"></div>
<!-- Несколько событий добавляются через пробел -->
<div data-sclape-on="click:function input:function"></div> 
```

## Реактивные значения

Для добавления реактивных значений в DOM дерево используются:
*data-sclape-value="variable"* - для простых значений
*data-sclape-html="variable"* - для вставки html

variable - переменная, помещенная в data объекта Sclape при инициализации

```html
<div data-sclape-value="primitiveVariable"></div>
<div data-sclape-html="htmlVariable"></div>
```

## Управление реактивными значениями

Для изменения реактивных значений используется хранилище Sclape:

```js
store.primitiveVariable.value += 1;
store.htmlVariable.value = '<p> New html </p>';
```

Пример использования вы можете найти в index.html
