import AbstractView from '../framework/view/abstract-view';

import { Sort } from '../enum';
import { sortByDate, sortByPrice } from '../utils/sort';

function createSortingTemplate(mode) {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input
        id="sort-day"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-day"
        ${mode === Sort.DAY ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-day">Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" disabled>
        <label class="trip-sort__btn" for="sort-time">Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input
        id="sort-price"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-price"
        ${mode === Sort.PRICE ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-price">Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>`;
}

export default class SortingView extends AbstractView {
  #inputChangeSortHandler = null;
  #inputDay = null;
  #inputPrice = null;
  #mode = Sort.DAY;

  constructor(inputChangeSortHandler) {
    super();
    this.#inputChangeSortHandler = inputChangeSortHandler;

    this.#searchElementInput();

    this.#inputDay.addEventListener('change', (evt) => {
      evt.preventDefault();
      this.#mode = Sort.DAY;
      this.#inputChangeSortHandler(Sort.DAY);
    });

    this.#inputPrice.addEventListener('change', (evt) => {
      evt.preventDefault();
      this.#mode = Sort.PRICE;
      this.#inputChangeSortHandler(Sort.PRICE);
    });
  }

  get template() {
    return createSortingTemplate(this.#mode);
  }

  #searchElementInput() {
    const inputsList = this.element.querySelectorAll('.trip-sort__input');
    inputsList.forEach((input) => {
      if(input.defaultValue === Sort.DAY) {
        this.#inputDay = input;
      } else if(input.defaultValue === Sort.PRICE) {
        this.#inputPrice = input;
      }
    });
  }

  sortPointByDayOrPrice(points) {
    if(points.length === 0) {return;}
    if(this.#mode === Sort.PRICE) {
      return sortByPrice(points);
    }
    return sortByDate(points);
  }
}
