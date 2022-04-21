/**
 * Construct a new Sclape instance
 * 
 * @param {Object} handlers - all functions for event listeners
 * @param {Object} data - all variables for reactive usage
*/

export default class Sclape {
  constructor({handlers, data}) {
    this.handlers = handlers;
    this.data = data;
    this._eventsRemovers = [];
  }

  // sclape events initialization
  initEvents() {
    if (!Object.keys(this.handlers).length) return console.error('event handlers is not defined');

    const elementsWithEvents = document.querySelectorAll('[data-sclape-on]');
    
    if (!elementsWithEvents.length) return console.error('there is no elements with sclape events');

    for (let i = 0; i < elementsWithEvents.length; i++) {
      const element = elementsWithEvents[i];

      const elementEvents = element.dataset.sclapeOn.split(' ');
      if (!elementEvents.length) continue;

      elementEvents.forEach(event => {
        const remover = addEvent(element, event, this.handlers);
        this._eventsRemovers.push(remover);
      });
    }
  }

  // sclape event remover
  removeEvents() {
    this._eventsRemovers.forEach(remover => remover());
  }

  // sclape store initialization
  initStore() {
    const dataLength = Object.keys(this.data).length;
    if (!dataLength) return console.error('reactive data is not defined');
    
    const store = {};

    const elementsWithReactiveValue = document.querySelectorAll('[data-sclape-value]');
    const elementsWithReactiveHtml = document.querySelectorAll('[data-sclape-html]');

    if (!elementsWithReactiveHtml.length && !elementsWithReactiveValue.length) return console.error('no elements with reactive data');

    const dataEntries = Object.entries(this.data);
    for (let i = 0; i < dataLength; i++) {
      const [key, value] = dataEntries[i];

      elementsWithReactiveValue?.forEach(element => {
        if (element.dataset.sclapeValue === key) {
          store[key] = initStoreData(element, value, 'text');
        }
      })

      elementsWithReactiveHtml?.forEach(element => {
        if (element.dataset.sclapeHtml === key) {
          store[key] = initStoreData(element, value, 'html');
        }
      })
    }

    return store;
  }
}


/**
 * Adds element event listener
 * @param {Object} element DOM element
 * @param {String} event event info from data attr (event:handlerFunc)
 * @param {Object} handlers object with all event handlers in sclape
 * @returns {Function} added event remover function
 */
function addEvent(element, event, handlers) {
  const eventInfo = event.split(':');
  const eventType = eventInfo[0];
  const eventHandlerName = eventInfo[1];

  element.addEventListener(eventType, handlers[eventHandlerName]);

  return function() {
    element.removeEventListener(eventType, handlers[eventHandlerName]);
  }
}

/**
 * Store values initialization
 * @param {Object} element - DOM element with this value
 * @param {any} value
 * @param {String} type - 'text' or 'html'
 * @returns {Object} store instance
 */
function initStoreData(element, value, type) {
  const updateValue = (element, type, value) => {
    switch (type) {
      case 'text':
        element.textContent = value;
        break;
      case 'html':
        element.innerHTML = value;
        break;
    }
  }

  updateValue(element, type, value);

  return new Proxy({
    value,
    element
  }, {
    set(target, prop, value) {
      if (prop === 'element') {
        console.error('dont try to break store, please');
        return false;
      }

      updateValue(element, type, value);

      target[prop] = value;
      return true;
    }
  })
}
