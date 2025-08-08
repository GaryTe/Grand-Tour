import AbstractView from '../framework/view/abstract-view';

function createListRoutesTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListRoutesView extends AbstractView {
  get template() {
    return createListRoutesTemplate();
  }
}
