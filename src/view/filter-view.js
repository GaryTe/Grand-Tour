import AbstractView from '../framework/view/abstract-view';

import { Filter } from '../enum';

function createFilterTemplate() {
  return `
    <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
            <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
            <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
            <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
            <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FilterView extends AbstractView {
  #inputEverything = null;
  #inputFuture = null;
  #inputChangeFilterHandler = null;

  constructor(inputChangeFilterHandler) {
    super();
    this.#inputChangeFilterHandler = inputChangeFilterHandler;

    this.#searchElementInput();

    this.#inputEverything.addEventListener('change', (evt) => {
      evt.preventDefault();
      this.#inputChangeFilterHandler(Filter.EVERYTHING);
    });

    this.#inputFuture.addEventListener('change', (evt) => {
      evt.preventDefault();
      this.#inputChangeFilterHandler(Filter.FUTURE);
    });

  }

  get template() {
    return createFilterTemplate();
  }

  #searchElementInput() {
    const inputsList = this.element.querySelectorAll('.trip-filters__filter-input');
    inputsList.forEach((input) => {
      if(input.defaultValue === Filter.EVERYTHING) {
        this.#inputEverything = input;
      } else if(input.defaultValue === Filter.FUTURE) {
        this.#inputFuture = input;
      }
    });
  }
}
