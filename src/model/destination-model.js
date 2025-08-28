import { destinations } from '../mock/destination';

export default class DestinationModel {
  getDestinationName(nameDestination) {
    return destinations.filter((item) => item.name === nameDestination);
  }

  getDestinationId(idDestination) {
    return destinations.filter((item) => item.id === idDestination);
  }
}
