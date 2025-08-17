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

  #destinationModel = new DestinationModel();
  #routeModel = new RouteModel();
  #pointRouteView = null;
  #listRoutesView = null;
  #form = null;

  constructor(
    buttonOpenEditFormHandler,
    documentRemoveEventListenerHandler,
    listRoutesView,
    listRoutesCloseFormHandler
  ) {
    this.#buttonOpenEditFormHandler = buttonOpenEditFormHandler;
    this.#documentRemoveEventListenerHandler = documentRemoveEventListenerHandler;
    this.#listRoutesView = listRoutesView;
    this.#listRoutesCloseFormHandler = listRoutesCloseFormHandler;
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

  #formPublishPointHandler = (dataNewPoint) => {
    this.#listRoutesCloseFormHandler();
    console.log(dataNewPoint);
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
      false,
      null,
      this.#formPublishPointHandler,
      this.#formCloseHandler,
      this.#formGetDestinationHandle,
      this.#formGetRouteHandle
    );
    render(this.#form, this.#listRoutesView.element, RenderPosition.AFTERBEGIN);
  }

  renderFormEditPoint() {
    this.switchMode();
    this.#mode = ModeSwitch.EDIT;
    this.#form = new NewPointView(
      true,
      this.#buttonCloseEditFormHandler,
      null,
      null,
      this.#formGetDestinationHandle,
      this.#formGetRouteHandle
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
