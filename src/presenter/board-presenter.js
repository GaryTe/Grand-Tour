import FilterView from '../view/filter-view.js';
import ButtonNewEventView from '../view/button-new-event-view.js';
import SortingView from '../view/sorting-view.js';
import ListRoutesView from '../view/list-routes-view.js';
import PointRouteView from '../view/point-route-view.js';
import PointModel from '../model/point-model.js';
import EmptyListView from '../view/empty-list-view.js';
import NewPointView from '../view/new-point-view.js';

import {render, RenderPosition} from '../render.js';

export default class BoardPresenter {
  #controlsTrip = null;
  #containerBodyPage = null;

  #filterView = new FilterView();
  #buttonNewEventView = new ButtonNewEventView();
  #sortingView = new SortingView();
  #listRoutesView = new ListRoutesView();
  #pointModel = new PointModel();
  #emptyListView = new EmptyListView();
  #newPointView = null;

  constructor(controlsTrip, containerBodyPage) {
    this.#controlsTrip = controlsTrip;
    this.#containerBodyPage = containerBodyPage;
  }

  #deletePoint() {
    if(!this.#newPointView) {return;}
    this.#newPointView.element.remove();
    this.#newPointView.removeElement();
    this.#newPointView = null;
  }

  #renderPoint(points) {
    points.map((point) => {
      const pointRouteView = PointRouteView.getPointRouteView(point, this.buttonOpenEditFormHandler);
      render(pointRouteView, this.#listRoutesView.getElement());
    });
  }

  #render(points) {
    render(this.#filterView, this.#controlsTrip);
    render(this.#buttonNewEventView, this.#controlsTrip, RenderPosition.AFTEREND);

    if(points.length - 1 > 0) {
      render(this.#sortingView, this.#containerBodyPage);
      this.#renderPoint(points);
      render(this.#listRoutesView, this.#containerBodyPage);
    }else{
      render(this.#emptyListView, this.#containerBodyPage);
    }
  }

  init() {
    const points = this.#pointModel.getPoint();
    this.#render(points);
    this.#initializationHandlers();
  }

  buttonCloseEditFormHandler = () => {
    this.#deletePoint();
  };

  buttonOpenEditFormHandler = () => {
    this.#deletePoint();
    this.#buttonNewEventView.element.removeAttribute('disabled');
    this.#newPointView = new NewPointView(true);
    render(this.#newPointView, this.#listRoutesView.element, RenderPosition.AFTERBEGIN);
    this.#newPointView.buttonCloseEditFormHandler(this.buttonCloseEditFormHandler);
    document.addEventListener('keydown', this.#listRoutesCloseFormHandler);
  };

  buttonOpenFormHandler = () => {
    this.#deletePoint();
    this.#buttonNewEventView.element.setAttribute('disabled', '');
    this.#newPointView = new NewPointView();
    render(this.#newPointView, this.#listRoutesView.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#listRoutesCloseFormHandler);
  };

  #listRoutesCloseFormHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#buttonNewEventView.element.removeAttribute('disabled');
      this.#deletePoint();
      document.removeEventListener('keydown', this.#listRoutesCloseFormHandler);
    }
  };

  #initializationHandlers() {
    this.#buttonNewEventView.buttonOpenFormHandler(this.buttonOpenFormHandler);
  }
}
