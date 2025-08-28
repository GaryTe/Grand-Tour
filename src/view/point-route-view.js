import AbstractView from '../framework/view/abstract-view.js';

import { destinations } from '../mock/destination.js';

import { getOffers } from '../utils/point.js';
import { getDate, getTime } from '../utils/data-time.js';

function getNameDestination(destination) {
  const nameDestination = destinations.find((item) => item.id === destination);

  if(!nameDestination) {return '';}

  return nameDestination.name;
}

function createPointRouteTemplate(point) {
  const {basePrice, dataFrom, dataTo, type, offers, destination} = point;

  const icons = `img/icons/${type}.png`;
  const offersList = getOffers(offers);
  const date = getDate(dataFrom);
  const [timeFrom, timeTo] = getTime([dataFrom, dataTo]);

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${dataFrom}>${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src=${icons} alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${getNameDestination(destination)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${dataFrom}>${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime=${dataTo}>${timeTo}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            ${offersList.join('')}
          </li>
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
}

export default class PointRouteView extends AbstractView {
  #point = null;
  #buttonOpenEditFormHandler = null;
  _element = null;

  constructor(
    point,
    buttonOpenEditFormHandler
  ) {
    super();
    this.#point = point;
    this.#buttonOpenEditFormHandler = buttonOpenEditFormHandler;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', () => this.#buttonOpenEditFormHandler(point.id));
  }

  get template() {
    return createPointRouteTemplate(this.#point);
  }
}
