import BoardPresenter from './presenter/board-presenter.js';

const controlsTrip = document.querySelector('.trip-main__trip-controls');
const containerBodyPage = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(controlsTrip, containerBodyPage);
boardPresenter.init();
