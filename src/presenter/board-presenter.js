import FilterView from '../view/filter-view.js';
import ButtonNewEventView from '../view/button-new-event-view.js';
import SortingView from '../view/sorting-view.js';
import ListRoutesView from '../view/list-routes-view.js';
import PointPresenter from './point-presenter.js';
import PointModel from '../model/point-model.js';
import EmptyListView from '../view/empty-list-view.js';
import CommonApiService from '../common-api-service.js';

import {render, RenderPosition, remove} from '../framework/render.js';
import { Filter, Sort, ModeSortingView, UserAction, UpdateType } from '../enum.js';
import { sortByDate, sortByPrice } from '../utils/sort.js';
import { AUTHORIZATION, END_POINT } from '../utils/const/api-service.js';

export default class BoardPresenter {
  #controlsTrip = null;
  #containerBodyPage = null;

  #buttonNewEventView = null;
  #sortingView = null;
  #listRoutesView = new ListRoutesView();
  #commonApiService = new CommonApiService(END_POINT, AUTHORIZATION);
  #pointModel = new PointModel(this.#commonApiService);
  #pointPresenter = null;
  #emptyListView = null;

  #collectionPointsPresenter = new Map();
  #points = [];
  #mode = Filter.EVERYTHING;
  #modeSortingView = ModeSortingView.DELETE;

  constructor(controlsTrip, containerBodyPage) {
    this.#controlsTrip = controlsTrip;
    this.#containerBodyPage = containerBodyPage;

    this.#sortingView = new SortingView(this.inputChangeSortHandler);
    this.#modeSortingView = ModeSortingView.CREATE;
  }

  #setPointsPresenter(pointId = 1, pointRoute) {
    this.#collectionPointsPresenter.set(pointId, pointRoute);
  }

  #renderPoint(points) {
    points.map((point) => {
      const pointPresenter = new PointPresenter(
        this.#buttonOpenEditFormHandler,
        this.#documentRemoveEventListenerHandler,
        this.#listRoutesView,
        this.#onListRoutesCloseForm,
        this.#handleViewAction,
        this.#commonApiService,
        this.#containerBodyPage
      );
      pointPresenter.init(point);
      this.#setPointsPresenter(point.id, pointPresenter);
    });
  }

  #checkEmptyListView() {
    if(this.#emptyListView) {
      remove(this.#emptyListView);
      this.#emptyListView = null;
    }
  }

  #checkPointsList(points) {
    if(points.length > 0) {
      this.#checkEmptyListView();
      render(this.#sortingView, this.#containerBodyPage);
      if(this.#modeSortingView === ModeSortingView.DELETE) {
        this.#sortingView.restoreHandlers();
        this.#modeSortingView = ModeSortingView.CREATE;
      }
      this.#renderPoint(points);
      render(this.#listRoutesView, this.#containerBodyPage);
    }else{
      remove(this.#sortingView);
      this.#modeSortingView = ModeSortingView.DELETE;
      this.#emptyListView = new EmptyListView(this.#mode);
      render(this.#emptyListView, this.#containerBodyPage);
    }
  }

  #render(points) {
    render(new FilterView(this.inputChangeFilterHandler), this.#controlsTrip);
    this.#buttonNewEventView = new ButtonNewEventView(this.#buttonOpenCreateFormHandler);
    render(this.#buttonNewEventView, this.#controlsTrip, RenderPosition.AFTEREND);

    this.#checkPointsList(points);
  }

  async init() {
    this.#points = await this.#pointModel.getEverythingPoint();
    this.#points = this.#sortingView.sortPointByDayOrPrice(this.#points);
    this.#render(this.#points);
  }

  #getFilterOrSortPoint() {
    for(const pointPresenter of this.#collectionPointsPresenter.values()) {
      pointPresenter.destroy();
    }
    this.#collectionPointsPresenter.clear();
    this.#checkPointsList(this.#points);
  }

  inputChangeFilterHandler = (value) => {
    switch(value) {
      case Filter.EVERYTHING :
        this.#mode = Filter.EVERYTHING;
        this.#points = this.#pointModel.points;
        this.#points = this.#sortingView.sortPointByDayOrPrice(this.#points);
        this.#getFilterOrSortPoint();
        break;
      case Filter.FUTURE :
        this.#mode = Filter.FUTURE;
        this.#points = this.#pointModel.getFuturePoint();
        this.#points = this.#sortingView.sortPointByDayOrPrice(this.#points);
        this.#getFilterOrSortPoint();
        break;
    }
  };

  inputChangeSortHandler = (value) => {
    switch(value) {
      case Sort.DAY :
        this.#points = this.#pointModel.points;
        this.#points = sortByDate(this.#points);
        this.#getFilterOrSortPoint();
        break;
      case Sort.PRICE :
        this.#points = this.#pointModel.points;
        this.#points = sortByPrice(this.#points);
        this.#getFilterOrSortPoint();
        break;
    }
  };

  #handleViewAction = (update, {actionType, updateType}) => {
    switch (actionType) {
      case UserAction.ADD_TASK:
        this.#pointModel.addObserver(this.#handleModelEvent);
        this.#pointModel.addPoint(update, updateType);
        break;
      case UserAction.UPDATE_TASK:
        this.#pointModel.addObserver(this.#handleModelEvent);
        this.#pointModel.updatePoint(update, updateType);
        break;
      case UserAction.DELETE_TASK:
        this.#pointModel.addObserver(this.#handleDeleteEvent);
        this.#pointModel.deletePoint(update, updateType);
        break;
    }
  };

  #handleModelEvent = (updateType, point) => {
    const idPointPresenter = point?.idPointPresenter;
    switch (updateType) {
      case UpdateType.MINOR:
        this.inputChangeFilterHandler(this.#mode);
        this.#pointModel.removeObserver(this.#handleModelEvent);
        break;
      case UpdateType.PATCH:
        delete point.idPointPresenter;
        this.#collectionPointsPresenter.get(idPointPresenter).replaceOldPointRouteViewToNewPointRouteView(point);
        this.#pointModel.removeObserver(this.#handleModelEvent);
        break;
    }
  };

  #handleDeleteEvent = (_updateType, point) => {
    const pointPresenter = this.#collectionPointsPresenter.get(point.id);

    pointPresenter.destroy();
    this.#collectionPointsPresenter.delete(point.id);

    this.#pointModel.removeObserver(this.#handleDeleteEvent);
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
    this.#pointPresenter.renderFormEditPoint(this.#pointPresenter.point);
  };

  #buttonOpenCreateFormHandler = () => {
    this.#checkOpenForm();
    this.#buttonNewEventView.element.setAttribute('disabled', '');
    this.#pointPresenter = this.#collectionPointsPresenter.values().next().value;
    if(!this.#pointPresenter) {
      this.#renderPoint([{id: null}]);
      this.#pointPresenter = this.#collectionPointsPresenter.values().next().value;
      this.#pointPresenter.renderFormCreateNewPoint();
      return;
    }
    this.#pointPresenter.renderFormCreateNewPoint();
  };

  #documentRemoveEventListenerHandler = () => {
    this.#pointPresenter = null;
    document.removeEventListener('keydown', this.#listRoutesCloseFormHandler);
  };

  #closeForm = () => {
    this.#pointPresenter.switchMode();
    this.#buttonNewEventView.element.removeAttribute('disabled');
    this.#documentRemoveEventListenerHandler();
  };

  #listRoutesCloseFormHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeForm();
    }
  };

  #onListRoutesCloseForm = () => {
    this.#closeForm();
  };
}
