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
