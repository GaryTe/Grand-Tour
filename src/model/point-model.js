import dayjs from 'dayjs';

import Observable from '../framework/observable';

import { points } from '../mock/point';
import { offers } from '../mock/offer';

export default class PointModel extends Observable {

  getEverythingPoint() {
    const pointsList = this.#collectionEverythingDataPoint(points);

    return pointsList;
  }

  #collectionEverythingDataPoint(pointList) {
    const pointsList = [];
    const copyPointsList = pointList.slice();

    copyPointsList.forEach((point) => {
      const idOffers = point._offers;
      let newPoint = {};

      if(idOffers && idOffers.length > 0) {
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
        const editPoint = {
          ...point,
          offers: point._offers
        };

        delete editPoint._offers;
        pointsList.push(editPoint);
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

  addPoint(update, updateType) {
    points.push(update);

    this._notify(updateType);
  }

  updatePoint(update, updateType) {
    points.filter((point) => point.id !== update.id);
    points.push(update);

    const [updatePoint] = this.#collectionEverythingDataPoint([update]);

    this._notify(updateType, updatePoint);
  }

  deletePoint(deletePoint, updateType) {
    points.filter((point) => point.id !== deletePoint.id);

    this._notify(updateType, deletePoint);
  }
}
