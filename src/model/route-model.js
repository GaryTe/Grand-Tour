import { routes } from '../mock/route';
import { offers } from '../mock/offer';

export default class RouteModel {
  getRouteName(nameRoute) {
    const offersList = [];

    const [route] = routes.filter((item) => item.type === nameRoute);

    if(route.offers.length === 0) {
      return route;
    }

    route.offers.forEach((idOffer) => {
      const [offer] = offers.filter((item) => item.id === idOffer);
      offersList.push(offer);
    });

    return {
      ...route,
      offers: offersList
    };
  }
}
