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
  }

  // sclape events initialization
  initEvents () {

  }

  // sclape event remover
  removeEvents () {
    // ...
  }

  // sclape store initialization
  initStore() {

  }
}

/**
 * Elements by event getter
 * 
 * @param {String} event event type
 * @returns {ArrayLike} DOM elements with selected events array
 */

function getElementsByEvent(event) {
  return document.querySelectorAll(`[data-${event}]`);
}
