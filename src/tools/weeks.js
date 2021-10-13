const moment = require('moment');

const weekEndDates = {
  1: '2021-09-15',
  2: '2021-09-22',
  3: '2021-09-29',
  4: '2021-10-06',
  5: '2021-10-13',
  6: '2021-10-20',
  7: '2021-10-27',
  8: '2021-11-03',
  9: '2021-11-10',
  10: '2021-11-17',
  11: '2021-11-24',
  12: '2021-12-01',
  13: '2021-12-08',
  14: '2021-12-15',
  15: '2021-12-22',
  16: '2021-12-29',
  17: '2022-01-05',
  18: '2022-01-12',
  19: '2022-01-19',
  20: '2022-01-26',
  21: '2022-02-07',
};

function thisWeek() {
  return (
    Object.values(weekEndDates).findIndex((date) => {
      return moment(date).subtract(1, 'days').isAfter(moment());
    }) + 1
  );
}

module.exports = {
  thisWeek,
  weekEndDates,
};
