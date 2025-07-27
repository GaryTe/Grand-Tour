import {createElement} from '../render.js';

function createButtonNewEventTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class ButtonNewEventView {
  #getTemplate() {
    return createButtonNewEventTemplate();
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

  buttonOpenFormHandler(buttonOpenFormHandler) {
    this.element.addEventListener('click', () => buttonOpenFormHandler());
  }
}
