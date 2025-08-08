import dayjs from 'dayjs';

import { points } from '../mock/point';
import { offers } from '../mock/offer';

export default class PointModel {

  getEverythingPoint() {
    const pointsList = this.#collectionEverythingDataPoint();

    return pointsList;
  }

  #collectionEverythingDataPoint() {
    const pointsList = [];
    const copyPointsList = points.slice();

    copyPointsList.forEach((point) => {
      const idOffers = point._offers;
      let newPoint = {};

      if(idOffers && idOffers.length - 1 > 0) {
        newPoint.offers = [];

        for(const id of idOffers) {
          offers.forEach((offer) => {
            if(id === offer.id) {
              newPoint.offers.push(offer);
            }
          });
        }

        newPoint = {
          ...point,
          ...newPoint
        };
        delete newPoint._offers;

        pointsList.push(newPoint);
      }else{
        pointsList.push(point);
      }
    });

    return pointsList;
  }

  getFuturePoint() {
    const pointsList = this.#collectionFutureDataPoint();

    return pointsList;
  }

  #collectionFutureDataPoint() {
    const pointsList = this.#collectionEverythingDataPoint();
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
}
