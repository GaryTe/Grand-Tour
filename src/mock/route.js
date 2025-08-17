import { PointType } from '../enum';

export const routes = [
  {
    type: PointType.TAXI,
    offers: [1,2]
  },
  {
    type: PointType.BUS,
    offers: []
  },
  {
    type: PointType.RESTAURANT,
    offers: []
  }
];
