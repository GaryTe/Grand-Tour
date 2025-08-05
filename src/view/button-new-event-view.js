import AbstractView from '../framework/view/abstract-view';

function createButtonNewEventTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class ButtonNewEventView extends AbstractView {
  #buttonOpenFormHandler = null;

  constructor(buttonOpenFormHandler) {
    super();
    this.#buttonOpenFormHandler = buttonOpenFormHandler;

    this.element.addEventListener('click', () => this.#buttonOpenFormHandler());
  }

  get template() {
    return createButtonNewEventTemplate();
  }
}
