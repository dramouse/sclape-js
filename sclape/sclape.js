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
    this.eventsRemovers = [];
  }

  // sclape events initialization
  initEvents() {
    if (!this.handlers) return console.error('event handlers is not defined');

    var elementsWithEvents = document.querySelectorAll('[data-sclape-on]');
    
    if (!elementsWithEvents.length) return console.error('there is no elements with sclape events');

    for (let i = 0; i < elementsWithEvents.length; i++) {
      const element = elementsWithEvents[i];

      const elementEvents = element.dataset.sclapeOn.split(' ');
      if (!elementEvents.length) continue;

      elementEvents.forEach(event => {
        const remover = addEvent(element, event, this.handlers);
        this.eventsRemovers.push(remover);
      });
    }
  }

  // sclape event remover
  removeEvents() {
    this.eventsRemovers.forEach(remover => remover());
  }

  // sclape store initialization
  initStore() {

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
  var eventInfo = event.split(':');
  var eventType = eventInfo[0];
  var eventHandlerName = eventInfo[1];

  element.addEventListener(eventType, handlers[eventHandlerName]);

  return function() {
    element.removeEventListener(eventType, handlers[eventHandlerName]);
  }
}
