import { PointType } from '../enum';

export const points = [
  {
    basePrice: 100,
    dataFrom: '2025-07-21T11:30:59',
    dataTo: '2025-07-21T12:00:59',
    destination: null,
    id: 1,
    offers: null,
    type: PointType.BUS
  },
  {
    basePrice: 50,
    dataFrom: '2025-07-21T12:30:59',
    dataTo: '2025-07-21T12:40:59',
    destination: null,
    id: 1,
    offers: [1,2],
    type: PointType.TAXI
  },
];
