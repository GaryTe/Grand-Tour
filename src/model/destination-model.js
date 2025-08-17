import { destination } from '../mock/destination';

export default class DestinationModel {
  getDestinationName(nameDestination) {
    return destination.filter((item) => item.name === nameDestination);
  }
}
