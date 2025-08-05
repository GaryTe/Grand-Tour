import PointRouteView from '../view/point-route-view';
import NewPointView from '../view/new-point-view';

import { render, RenderPosition, remove, replace } from '../framework/render';
import { ModeSwitch } from '../enum';

export default class PointPresenter {
  #point = null;
  #mode = ModeSwitch.DEFAULT;

  #buttonOpenEditFormHandler = null;
  #documentRemoveEventListenerHandler = null;

  #pointRouteView = null;
  #listRoutesView = null;
  #form = null;

  constructor(
    buttonOpenEditFormHandler,
    documentRemoveEventListenerHandler,
    listRoutesView
  ) {
    this.#buttonOpenEditFormHandler = buttonOpenEditFormHandler;
    this.#documentRemoveEventListenerHandler = documentRemoveEventListenerHandler;
    this.#listRoutesView = listRoutesView;
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

  #buttonCloseEditFormHandler = () => {
    this.#removeFormEditPoint();
    this.#documentRemoveEventListenerHandler();
  };

  renderFormCreateNewPoint() {
    this.switchMode();
    this.#mode = ModeSwitch.CREATE;
    this.#form = new NewPointView();
    render(this.#form, this.#listRoutesView.element, RenderPosition.AFTERBEGIN);
  }

  renderFormEditPoint() {
    this.switchMode();
    this.#mode = ModeSwitch.EDIT;
    this.#form = new NewPointView(true, this.#buttonCloseEditFormHandler);
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
