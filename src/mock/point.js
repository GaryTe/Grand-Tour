import { PointType } from '../enum';

export const points = [
  {
    basePrice: 100,
    dataFrom: '2025-07-21T11:30:59.000Z',
    dataTo: '2025-07-21T12:00:59.000Z',
    destination: null,
    id: 1,
    _offers: [],
    type: PointType.BUS
  },
  {
    basePrice: 50,
    dataFrom: '2025-07-10T12:30:59.000Z',
    dataTo: '2025-07-10T12:40:59.000Z',
    destination: null,
    id: 2,
    _offers: [1,2],
    type: PointType.TAXI
  },

  {
    basePrice: 100,
    dataFrom: '2025-08-10T11:30:59.000Z',
    dataTo: '2025-09-07T12:00:59.000Z',
    destination: null,
    id: 3,
    _offers: [],
    type: PointType.RESTAURANT
  }
];
