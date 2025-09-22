//import { nanoid } from 'nanoid';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import AbstractStatefulView from '../framework/view/abstract-stateful-view';

import { PointType, ModeDate, UserAction, UpdateType } from '../enum';

function getPhotosDestination(photos) {
  return photos.map(({src, description}) => `<img class="event__photo" src=${src} alt=${description}>`).join('');
}

function getOffersRoute(offers, nameOffersList) {
  return nameOffersList.map(({title, price}) => `<div class="event__offer-selector">
              <input
              class="event__offer-checkbox  visually-hidden"
              id="event-offer-${title}"
              type="checkbox"
              name="event-offer-${title}"
              ${offers.find((offer) => offer.title === title) ? 'checked' : ''}
              >
              <label class="event__offer-label" for="event-offer-${title}">
                <span class="event__offer-title">${title}</span>
                  &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`).join('');
}

function createNewPointTemplate(edit, state, nameOffersList) {
  const {
    type,
    offers,
    basePrice,
    destination
  } = state;

  return `
  <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img
                      class="event__type-icon" width="17"
                      height="17"
                      ${type.length === 0 ? 'src="img/icons"' : `src=img/icons/${type}.png`}
                      alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input
                          id="event-type-taxi-1"
                          class="event__type-input  visually-hidden"
                          type="radio"
                          name="event-type"
                          value="taxi"
                          ${type === PointType.TAXI ? 'checked' : ''}
                          >
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input
                          id="event-type-bus-1"
                          class="event__type-input  visually-hidden"
                          type="radio"
                          name="event-type"
                          value="bus"
                          ${type === PointType.BUS ? 'checked' : ''}
                          >
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" disabled>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" disabled>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" disabled>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" disabled>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" disabled>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" disabled>
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input
                          id="event-type-restaurant-1"
                          class="event__type-input  visually-hidden"
                          type="radio"
                          name="event-type"
                          value="restaurant"
                          ${type === PointType.RESTAURANT ? 'checked' : ''}
                          >
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${!type ? '' : type}
                    </label>
                    <input
                    class="event__input  event__input--destination"
                    id="event-destination-1"
                    type="text"
                    name="event-destination"
                    ${!destination ? 'value = ""' : `value = ${destination.name}`}
                    list="destination-list-1"
                    >
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="dataFrom">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="dataTo">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input
                    class="event__input  event__input--price"
                    id="event-price-1"
                    type="text"
                    name="event-price"
                    value=${!basePrice ? '' : basePrice}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  ${!edit ? '<button class="event__reset-btn" type="reset">Cancel</button>' : '<button class="event__reset-btn" type="reset">Delete</button>'}
                  ${!edit ? '' : '<button class="event__rollup-btn" type="button"> <span class="visually-hidden">Open event</span> </button>'}
                </header>
                <section class="event__details">
                  ${nameOffersList.length === 0 ? '' : `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${getOffersRoute(offers, nameOffersList)}
                    </div>
                  </section>`}
                  ${!destination || !destination.description && destination.pictures.length === 0 ? '' : `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  ${!destination.description ? '' : `<p class="event__destination-description">${destination.description}</p>`}

                    ${destination.pictures.length === 0 ? '' : `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${getPhotosDestination(destination.pictures)}
                      </div>
                    </div>`}
                  </section>`}
                </section>
              </form>
            </li>
  `;
}

export default class NewPointView extends AbstractStatefulView {
  #edit = false;
  #nameOffersList = [];
  #datepickers = [];

  #buttonCloseEditFormHandler = null;
  #onFormPublishPoint = null;
  #formCloseHandler = null;
  #formGetDestinationHandle = null;
  #formGetRouteHandle = null;
  #buttonDeletePointHandler = null;

  #divTypeList = null;
  #inputDestination = null;
  #inputPrice = null;

  constructor(
    dataPoint,
    edit,
    buttonCloseEditFormHandler,
    formPublishPointHandler,
    formCloseHandler,
    formGetDestinationHandle,
    formGetRouteHandle,
    buttonDeletePointHandler,
    offers
  ) {
    super();
    this._setState({...dataPoint});
    this.#edit = edit;
    this.#buttonCloseEditFormHandler = buttonCloseEditFormHandler;
    this.#onFormPublishPoint = formPublishPointHandler;
    this.#formCloseHandler = formCloseHandler;
    this.#formGetDestinationHandle = formGetDestinationHandle;
    this.#formGetRouteHandle = formGetRouteHandle;
    this.#buttonDeletePointHandler = buttonDeletePointHandler;
    this.#nameOffersList = [...offers];

    this._restoreHandlers();
  }

  get template() {
    return createNewPointTemplate(
      this.#edit,
      this._state,
      this.#nameOffersList
    );
  }

  #setDatepicker() {
    const dateElements = this.element.querySelectorAll('.event__input--time');

    dateElements.forEach((element) => {
      const calendar = flatpickr(
        element,
        {
          defaultDate: `${element.defaultValue === ModeDate.DATE_FROM ? this._state.dataFrom : this._state.dataTo}`,
          enableTime: true,
          dateFormat: 'd/m/y H:i'
        },
      );

      if(element.defaultValue === ModeDate.DATE_FROM) {
        calendar.config.maxDate = this._state.dataTo;
        calendar.config.onClose.push(this.#elementDateFromChangeHandler);
      }else{
        calendar.config.minDate = this._state.dataFrom;
        calendar.config.onClose.push(this.#elementDateToChangeHandler);
      }
      this.#datepickers.push(calendar);
    });
  }

  _restoreHandlers = () => {
    this.#divTypeList = this.element.querySelector('.event__type-list');
    this.#inputDestination = this.element.querySelector('.event__input--destination');
    this.#inputPrice = this.element.querySelector('.event__input--price');

    this.#divTypeList
      .addEventListener('change', this.#typePointChangeHandler);
    this.#inputDestination
      .addEventListener('input', this.#typeDestinationChangeHandler);
    this.#inputDestination
      .addEventListener('focus', () => {this.#inputDestination.value = '';});
    this.#inputPrice
      .addEventListener('blur', this.#priceChangeHandler);
    this.element.querySelector('.event__save-btn')
      .addEventListener('click', this.#formPublishPointHandler);

    if(this.#nameOffersList.length > 0) {
      this.element.querySelector('.event__available-offers')
        .addEventListener('change', this.#offerGetValueHandler);
    }

    if(this.#edit) {
      this.#onButtonCloseEditForm();
      this.#onButtonDeletePoint();
    }else{
      this.#onFormClose();
    }

    this.#setDatepicker();
  };

  #typePointChangeHandler = async (evt) => {
    evt.preventDefault();
    const {type, offers} = await this.#formGetRouteHandle(evt.target.value);
    this.#nameOffersList = [...offers];
    this.updateElement({type});
  };

  #typeDestinationChangeHandler = async (evt) => {
    evt.preventDefault();
    const destination = await this.#formGetDestinationHandle(evt.target.value);
    this.updateElement({destination: destination});
  };

  #elementDateFromChangeHandler = (selectedDates) => {
    const date = new Date(selectedDates[0]).toISOString();
    this.updateElement({dataFrom: date});
  };

  #elementDateToChangeHandler = (selectedDates) => {
    const date = new Date(selectedDates[0]).toISOString();
    this.updateElement({dataTo: date});
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    const price = Math.trunc(Math.abs(evt.target.value));
    this.updateElement({basePrice: price});
  };

  #offerGetValueHandler = (evt) => {
    evt.preventDefault();
    const nameOffer = evt.target.labels[0].children[0].innerText;

    if(this._state.offers.find((offer) => offer.title === nameOffer)) {
      this._state.offers = this.#nameOffersList.filter((offer) => offer.title !== nameOffer);
    }else{
      this.#nameOffersList.forEach((offer) => {
        if(offer.title === nameOffer) {
          this._state.offers.push(offer);
        }
      });
    }
  };

  #formPublishPointHandler = (evt) => {
    evt.preventDefault();
    const offersList = [];
    let parameter = {};

    const {type, destination, basePrice, offers} = this._state;

    if(!type) {
      this.#divTypeList.focus();
      return;
    }
    if(!destination) {
      this.#inputDestination.focus();
      return;
    }
    if(!basePrice) {
      this.#inputPrice.focus();
      return;
    }

    if(offers.length > 0) {
      offers.forEach((offer) => {
        offersList.push(offer.id);
      });
    }

    const point = {
      ...this._state,
      destination: destination.id,
      offers: offersList
    };

    parameter = !this.#edit ? {actionType: UserAction.ADD_TASK, updateType: UpdateType.MINOR} : {actionType: UserAction.UPDATE_TASK, updateType: UpdateType.PATCH};

    this.#onFormPublishPoint(point, parameter);
  };

  #onButtonCloseEditForm() {
    const buttonCloseEditForm = this.element.querySelector('.event__rollup-btn');
    buttonCloseEditForm.addEventListener('click', () => {
      this.#buttonCloseEditFormHandler();
      buttonCloseEditForm.removeEventListener('click', this.#buttonCloseEditFormHandler);
    });
  }

  #onButtonDeletePoint() {
    const buttonDeletePoint = this.element.querySelector('.event__reset-btn');
    buttonDeletePoint.addEventListener('click', () => {
      this.#buttonDeletePointHandler(this._state, {actionType: UserAction.DELETE_TASK, updateType: UpdateType.PATCH});
      buttonDeletePoint.removeEventListener('click', this.#onButtonDeletePoint);
    });
  }

  #onFormClose() {
    const buttonCloseForm = this.element.querySelector('.event__reset-btn');
    buttonCloseForm.addEventListener('click', () => {
      this.#formCloseHandler();
      buttonCloseForm.removeEventListener('click', this.#formCloseHandler);
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickers.length > 0) {
      this.#datepickers.forEach((datepicker) => {
        datepicker.destroy();
      });
      this.#datepickers = [];
    }
  }
}
