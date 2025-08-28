import PointRouteView from '../view/point-route-view';
import NewPointView from '../view/new-point-view';
import DestinationModel from '../model/destination-model';
import RouteModel from '../model/route-model';

import { render, RenderPosition, remove, replace } from '../framework/render';
import { ModeSwitch } from '../enum';

export default class PointPresenter {
  #point = null;
  #mode = ModeSwitch.DEFAULT;

  #buttonOpenEditFormHandler = null;
  #documentRemoveEventListenerHandler = null;
  #listRoutesCloseFormHandler = null;
  #handleViewAction = null;

  #destinationModel = new DestinationModel();
  #routeModel = new RouteModel();
  #pointRouteView = null;
  #listRoutesView = null;
  #form = null;

  constructor(
    buttonOpenEditFormHandler,
    documentRemoveEventListenerHandler,
    listRoutesView,
    listRoutesCloseFormHandler,
    handleViewAction
  ) {
    this.#buttonOpenEditFormHandler = buttonOpenEditFormHandler;
    this.#documentRemoveEventListenerHandler = documentRemoveEventListenerHandler;
    this.#listRoutesView = listRoutesView;
    this.#listRoutesCloseFormHandler = listRoutesCloseFormHandler;
    this.#handleViewAction = handleViewAction;
  }

  get point() {
    return this.#point;
  }

  #renderPoint(point) {
    this.#point = point;

    this.#pointRouteView = new PointRouteView(
      this.#point,
      this.#buttonOpenEditFormHandler
    );
    render(this.#pointRouteView, this.#listRoutesView.element);
  }

  init(point) {
    this.#renderPoint(point);
  }

  #formPublishPointHandler = (dataNewPoint, parameter) => {
    this.#listRoutesCloseFormHandler();
    this.#handleViewAction(dataNewPoint, parameter);
  };

  #buttonDeletePointHandler = (point, parameter) => {
    this.#listRoutesCloseFormHandler();
    this.#handleViewAction(point, parameter);
  };

  #formCloseHandler = () => {
    this.#listRoutesCloseFormHandler();
  };

  #buttonCloseEditFormHandler = () => {
    this.#removeFormEditPoint();
    this.#documentRemoveEventListenerHandler();
  };

  #formGetDestinationHandle = (nameDestination) => {
    const [destination] = this.#destinationModel.getDestinationName(nameDestination);
    return destination;
  };

  #formGetRouteHandle = (nameRoute) => this.#routeModel.getRouteName(nameRoute);

  renderFormCreateNewPoint() {
    this.switchMode();
    this.#mode = ModeSwitch.CREATE;
    this.#form = new NewPointView(
      {
        type: '',
        offers: [],
        basePrice: null,
        destination: null,
        dateFrom: new Date().toISOString(),
        dateTo: new Date().toISOString(),
      },
      false,
      null,
      this.#formPublishPointHandler,
      this.#formCloseHandler,
      this.#formGetDestinationHandle,
      this.#formGetRouteHandle,
      null
    );
    render(this.#form, this.#listRoutesView.element, RenderPosition.AFTERBEGIN);
  }

  renderFormEditPoint(dataPoint) {
    this.switchMode();
    this.#mode = ModeSwitch.EDIT;
    const [destination] = this.#destinationModel.getDestinationId(dataPoint.destination);

    this.#form = new NewPointView(
      {...dataPoint, destination},
      true,
      this.#buttonCloseEditFormHandler,
      this.#formPublishPointHandler,
      null,
      this.#formGetDestinationHandle,
      this.#formGetRouteHandle,
      this.#buttonDeletePointHandler
    );
    replace(this.#form, this.#pointRouteView);
  }

  #removeFormEditPoint() {
    replace(this.#pointRouteView, this.#form);
    this.#removeFormCreateNewPoint();
  }

  #removeFormCreateNewPoint() {
    remove(this.#form);
    this.#form = null;
    this.#mode = ModeSwitch.DEFAULT;
  }

  replaceOldPointRouteViewToNewPointRouteView(point) {
    const newPointRouteView = new PointRouteView(
      point,
      this.#buttonOpenEditFormHandler
    );

    replace(newPointRouteView, this.#pointRouteView);

    this.#point = point;
    this.#pointRouteView = newPointRouteView;
  }

  switchMode() {
    switch(this.#mode) {
      case ModeSwitch.CREATE :
        this.#removeFormCreateNewPoint();
        break;
      case ModeSwitch.EDIT :
        this.#removeFormEditPoint();
    }
  }

  destroy() {
    remove(this.#pointRouteView);
    remove(this.#form);
  }
}
