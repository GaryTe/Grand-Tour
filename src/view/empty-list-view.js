import AbstractView from '../framework/view/abstract-view';

import { Filter } from '../enum';

function createEmptyListTemplate(value) {
  switch(value) {
    case Filter.EVERYTHING :
      return '<p class="trip-events__msg">Click New Event to create your first point</p>';
    case Filter.FUTURE :
      return '<p class="trip-events__msg">There are no future events now</p>';
    case Filter.ERROR :
      return '<p class="trip-events__msg">Error, when requesting</p>';
  }
}

export default class EmptyListView extends AbstractView {
  #switch = null;

  constructor(value) {
    super();
    this.#switch = value;
  }

  get template() {
    return createEmptyListTemplate(this.#switch);
  }
}
