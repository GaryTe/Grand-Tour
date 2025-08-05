import { points } from '../mock/point';
import { offers } from '../mock/offer';

export default class PointModel {

  getEverythingPoint() {
    const pointsList = this.#collectionDataPoint();

    return pointsList;
  }

  #collectionDataPoint() {
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
}
