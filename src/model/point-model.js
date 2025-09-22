import dayjs from 'dayjs';

import Observable from '../framework/observable';

export default class PointModel extends Observable {
  #commonApiService = null;
  #pointsList = [];

  constructor(commonApiService) {
    super();
    this.#commonApiService = commonApiService;
  }

  get points() {
    return this.#pointsList;
  }

  async getEverythingPoint() {
    try{
      const response = await this.#commonApiService.getPoints();
      this.#pointsList = [...response];
      return this.#pointsList;
    }catch(err){
      throw new Error('Can\'t get points');
    }
  }

  getFuturePoint() {
    const pointsList = this.#collectionFutureDataPoint();

    return pointsList;
  }

  #collectionFutureDataPoint() {
    const pointsList = this.#pointsList;
    let futurePointsList = [];

    const day = Number(dayjs().format('DD'));
    const month = Number(dayjs().format('MM'));
    const year = Number(dayjs().format('YYYY'));

    futurePointsList = pointsList.filter((point) => {
      const {dataFrom, dataTo} = point;
      let _day = Number(dayjs(dataFrom).format('DD'));
      let _month = Number(dayjs(dataFrom).format('MM'));
      let _year = Number(dayjs(dataFrom).format('YYYY'));

      if(_day >= day && _month === month && _year === year) {
        return point;
      }

      _day = Number(dayjs(dataTo).format('DD'));
      _month = Number(dayjs(dataTo).format('MM'));
      _year = Number(dayjs(dataTo).format('YYYY'));
      if(_day > day && _month === month && _year === year) {
        return point;
      }
    });

    return futurePointsList;
  }

  async addPoint(update, updateType) {
    try{
      const response = await this.#commonApiService.addPoint(update);
      this.#pointsList.push(response);
      this._notify(updateType);
    }catch(err){
      throw new Error('Can\'t add point');
    }
  }

  async updatePoint(update, updateType) {
    try{
      const response = await this.#commonApiService.updatePoint(update);
      const points = this.#pointsList.filter((point) => point.id !== update.id);
      this.#pointsList = [
        ...points,
        response
      ];
      this._notify(
        updateType, {
          ...response,
          idPointPresenter: update.id
        });
    }catch(err){
      throw new Error('Can\'t update point');
    }
  }

  async deletePoint(pointOfRemov, updateType) {
    try{
      const response = await this.#commonApiService.deletePoint(pointOfRemov.id);
      const points = this.#pointsList.filter((point) => point.id !== response.id);
      this.#pointsList = [
        ...points
      ];
      this._notify(updateType, pointOfRemov);
    }catch(err){
      throw new Error('Can\'t delete point');
    }
  }
}
