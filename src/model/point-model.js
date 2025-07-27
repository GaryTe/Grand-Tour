import { points } from '../mock/point';
import { offers } from '../mock/offer';

export default class PointModel {

  getPoint() {
    const pointsList = this.#collectionDataPoint();

    return pointsList;
  }

  #collectionDataPoint() {
    const pointsList = [];

    points.forEach((point) => {
      const idOffers = point.offers;
      let newPoint = null;

      if(idOffers) {
        point.offers = [];

        for(const id of idOffers) {
          const offersList = offers.filter((offer) => id === offer.id);

          newPoint = {
            ...point,
            ...point.offers.push(...offersList)
          };
        }
        pointsList.push(newPoint);
      }else{
        pointsList.push(point);
      }
    });

    return pointsList;
  }
}
