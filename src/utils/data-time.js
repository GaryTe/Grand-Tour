import dayjs from 'dayjs';

export const getDate = (date) => dayjs(date).format('MMM DD');

export const getTime = (timeList) => timeList.map((time) => dayjs(time).format('HH:mm'));

