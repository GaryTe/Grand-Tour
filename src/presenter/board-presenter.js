import FilterView from '../view/filter-view.js';
import ButtonNewEventView from '../view/button-new-event-view.js';
import SortingView from '../view/sorting-view.js';
import ListRoutesView from '../view/list-routes-view.js';
import PointRouteView from '../view/point-route-view.js';

import {render, RenderPosition} from '../render.js';

export default class BoardPresenter {
  controlsTrip = null;
  containerBodyPage = null;

  filterView = new FilterView();
  buttonNewEventView = new ButtonNewEventView();
  sortingView = new SortingView();
  listRoutesView = new ListRoutesView();
  pointRouteView = new PointRouteView();

  constructor(controlsTrip, containerBodyPage) {
    this.controlsTrip = controlsTrip;
    this.containerBodyPage = containerBodyPage;
  }

  render() {
    render(this.filterView, this.controlsTrip);
    render(this.buttonNewEventView, this.controlsTrip, RenderPosition.AFTEREND);
    render(this.sortingView, this.containerBodyPage);
    render(this.pointRouteView, this.listRoutesView.getElement());
    render(this.listRoutesView, this.containerBodyPage);
  }

  init() {
    this.render();
  }
}
