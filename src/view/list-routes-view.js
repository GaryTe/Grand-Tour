import {createElement} from '../render.js';

function createListRoutesTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListRoutesView {
  #getTemplate() {
    return createListRoutesTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.#getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
