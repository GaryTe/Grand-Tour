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

  #commonApiService = null;
  #destinationModel = null;
  #routeModel = null;
  #pointRouteView = null;
  #listRoutesView = null;
  #form = null;
  #containerBodyPage = null;

  constructor(
    buttonOpenEditFormHandler,
    documentRemoveEventListenerHandler,
    listRoutesView,
    listRoutesCloseFormHandler,
    handleViewAction,
    commonApiService,
    containerBodyPage
  ) {
    this.#buttonOpenEditFormHandler = buttonOpenEditFormHandler;
    this.#documentRemoveEventListenerHandler = documentRemoveEventListenerHandler;
    this.#listRoutesView = listRoutesView;
    this.#listRoutesCloseFormHandler = listRoutesCloseFormHandler;
    this.#handleViewAction = handleViewAction;
    this.#commonApiService = commonApiService;
    this.#destinationModel = new DestinationModel(this.#commonApiService);
    this.#routeModel = new RouteModel(this.#commonApiService);
    this.#containerBodyPage = containerBodyPage;
  }

  get point() {
    return this.#point;
  }

  #renderPoint(point) {
    this.#point = point;

    if(!point.id) {
      this.#point = point.id;
      return;
    }

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
    this.#handleViewAction(dataNewPoint, parameter);
  };

  #buttonDeletePointHandler = (point, parameter) => {
    this.#handleViewAction(point, parameter);
  };

  #formCloseHandler = () => {
    this.#listRoutesCloseFormHandler();
  };

  #buttonCloseEditFormHandler = () => {
    this.#removeFormEditPoint();
    this.#documentRemoveEventListenerHandler();
  };

  #formGetDestinationHandle = async (nameDestination) => {
    const destination = await this.#destinationModel.getDestinationName(nameDestination);
    return destination;
  };

  #formGetRouteHandle = async (nameRoute) => await this.#routeModel.getRouteName(nameRoute);

  renderFormCreateNewPoint() {
    this.switchMode();
    this.#mode = ModeSwitch.CREATE;
    this.#form = new NewPointView(
      {
        type: '',
        offers: [],
        basePrice: null,
        destination: null,
        dataFrom: new Date().toISOString(),
        dataTo: new Date().toISOString(),
      },
      false,
      null,
      this.#formPublishPointHandler,
      this.#formCloseHandler,
      this.#formGetDestinationHandle,
      this.#formGetRouteHandle,
      null,
      []
    );
    if(!this.#point) {
      render(this.#form, this.#containerBodyPage, RenderPosition.AFTERBEGIN);
      return;
    }
    render(this.#form, this.#listRoutesView.element, RenderPosition.AFTERBEGIN);
  }

  async renderFormEditPoint(dataPoint) {
    this.switchMode();
    this.#mode = ModeSwitch.EDIT;
    const {offers} = await this.#formGetRouteHandle(dataPoint.type);

    this.#form = new NewPointView(
      dataPoint,
      true,
      this.#buttonCloseEditFormHandler,
      this.#formPublishPointHandler,
      null,
      this.#formGetDestinationHandle,
      this.#formGetRouteHandle,
      this.#buttonDeletePointHandler,
      offers
    );
    replace(this.#form, this.#pointRouteView);
  }

  setSaving() {
    this.#form.updateElement({
      isSaving: true,
    });
  }

  setDeleting() {
    this.#form.updateElement({
      isDeleting: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#form.updateElement({
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#form.shake(resetFormState);
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
