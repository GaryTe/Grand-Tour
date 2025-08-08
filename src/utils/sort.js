import dayjs from 'dayjs';

const getDay = (date) => dayjs(date).format('DD');
const getMonth = (date) => dayjs(date).format('MM');

const sortByDay = (points) => points.slice ().sort ((a,b) => {
  if (getDay(a.dataFrom) < getDay(b.dataFrom)) {
    return -1;
  }
  if (getDay(a.dataFrom) > getDay(b.dataFrom)) {
    return 1;
  }
  return 0;
});

const sortByMonth = (points) => points.slice ().sort ((a,b) => {
  if (getMonth(a.dataFrom) < getMonth(b.dataFrom)) {
    return -1;
  }
  if (getMonth(a.dataFrom) > getMonth(b.dataFrom)) {
    return 1;
  }
  return 0;
});

export const sortByDate = (points) => {
  let pointsList = sortByDay(points);
  pointsList = sortByMonth(pointsList);

  return pointsList;
};

export const sortByPrice = (points) => points.slice ().sort ((a,b) => {
  if (a.basePrice < b.basePrice) {
    return -1;
  }
  if (a.basePrice > b.basePrice) {
    return 1;
  }
  return 0;
}).reverse ();
