import FilterView from '../view/filter-view.js';
import ButtonNewEventView from '../view/button-new-event-view.js';
import SortingView from '../view/sorting-view.js';
import ListRoutesView from '../view/list-routes-view.js';
import PointPresenter from './point-presenter.js';
import PointModel from '../model/point-model.js';
import EmptyListView from '../view/empty-list-view.js';

import {render, RenderPosition} from '../framework/render.js';
import { Filter } from '../enum.js';

export default class BoardPresenter {
  #controlsTrip = null;
  #containerBodyPage = null;

  #buttonNewEventView = null;
  #sortingView = new SortingView();
  #listRoutesView = new ListRoutesView();
  #pointModel = new PointModel();
  #emptyListView = new EmptyListView();
  #pointPresenter = null;

  #collectionPointsPresenter = new Map();

  constructor(controlsTrip, containerBodyPage) {
    this.#controlsTrip = controlsTrip;
    this.#containerBodyPage = containerBodyPage;
  }

  #setPointsPresenter(pointId, pointRoute) {
    this.#collectionPointsPresenter.set(pointId, pointRoute);
  }

  #renderPoint(points) {
    points.map((point) => {
      const pointPresenter = new PointPresenter(
        this.#buttonOpenEditFormHandler,
        this.#documentRemoveEventListenerHandler,
        this.#listRoutesView
      );
      pointPresenter.init(point);
      this.#setPointsPresenter(point.id, pointPresenter);
    });
  }

  #checkPointsList(points) {
    if(points.length - 1 > 0) {
      render(this.#sortingView, this.#containerBodyPage);
      this.#renderPoint(points);
      render(this.#listRoutesView, this.#containerBodyPage);
    }else{
      render(this.#emptyListView, this.#containerBodyPage);
    }
  }

  #render(points) {
    render(new FilterView(this.inputChangeFilterHandler), this.#controlsTrip);
    this.#buttonNewEventView = new ButtonNewEventView(this.#buttonOpenCreateFormHandler);
    render(this.#buttonNewEventView, this.#controlsTrip, RenderPosition.AFTEREND);

    this.#checkPointsList(points);
  }

  init() {
    const points = this.#pointModel.getEverythingPoint();
    this.#render(points);
  }

  inputChangeFilterHandler = (value) => {
    switch(value) {
      case Filter.EVERYTHING :
        for(const pointPresenter of this.#collectionPointsPresenter.values()) {
          pointPresenter.destroy();
        }
        this.#collectionPointsPresenter.clear();
        this.#checkPointsList(this.#pointModel.getEverythingPoint());
        break;
      case Filter.FUTURE :
        console.log(value);
        break;
    }
  };

  #checkOpenForm() {
    if(this.#pointPresenter) {
      this.#pointPresenter.switchMode();
    }
    document.addEventListener('keydown', this.#listRoutesCloseFormHandler);
  }

  #buttonOpenEditFormHandler = (idPointPresenter) => {
    this.#checkOpenForm();
    this.#buttonNewEventView.element.removeAttribute('disabled');
    this.#pointPresenter = this.#collectionPointsPresenter.get(idPointPresenter);
    this.#pointPresenter.renderFormEditPoint();
  };

  #buttonOpenCreateFormHandler = () => {
    this.#checkOpenForm();
    this.#buttonNewEventView.element.setAttribute('disabled', '');
    this.#pointPresenter = this.#collectionPointsPresenter.values().next().value;
    this.#pointPresenter.renderFormCreateNewPoint();
  };

  #documentRemoveEventListenerHandler = () => {
    this.#pointPresenter = null;
    document.removeEventListener('keydown', this.#listRoutesCloseFormHandler);
  };

  #listRoutesCloseFormHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#pointPresenter.switchMode();
      this.#buttonNewEventView.element.removeAttribute('disabled');
      this.#documentRemoveEventListenerHandler();
    }
  };
}
