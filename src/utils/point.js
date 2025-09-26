import dayjs from 'dayjs';

import { titleOffer } from '../const';

export const getOffers = (offers) => {
  let offersList = [];

  if(offers.length > 0) {
    offersList = offers.map(({title, price}) => `
      <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </li>
    `);
  }else{
    offersList.push(titleOffer);
  }

  return offersList;
};

export const checkFuturePoint = (point) => {
  const day = Number(dayjs().format('DD'));
  const month = Number(dayjs().format('MM'));
  const year = Number(dayjs().format('YYYY'));

  const checkPoint = () => {
    const {dataFrom, dataTo} = point;
    let _day = Number(dayjs(dataFrom).format('DD'));
    let _month = Number(dayjs(dataFrom).format('MM'));
    let _year = Number(dayjs(dataFrom).format('YYYY'));

    if(_day >= day && _month === month && _year === year) {
      return true;
    }

    _day = Number(dayjs(dataTo).format('DD'));
    _month = Number(dayjs(dataTo).format('MM'));
    _year = Number(dayjs(dataTo).format('YYYY'));
    if(_day > day && _month === month && _year === year) {
      return true;
    }

    return false;
  };

  return checkPoint();
};
