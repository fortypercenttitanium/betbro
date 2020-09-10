import moment from 'moment';

const weekEndDates = {
	1: '2020-09-16',
	2: '2020-09-23',
	3: '2020-09-30',
	4: '2020-10-07',
	5: '2020-10-14',
	6: '2020-10-21',
	7: '2020-10-28',
	8: '2020-11-04',
	9: '2020-11-11',
	10: '2020-11-18',
	11: '2020-11-25',
	12: '2020-12-02',
	13: '2020-12-09',
	14: '2020-12-16',
	15: '2020-12-23',
	16: '2020-12-30',
	17: '2020-01-06',
	18: '2021-01-13',
	19: '2021-01-20',
	20: '2021-01-27',
	21: '2021-02-08',
};

export default function thisWeek() {
	return weekEndDates[
		Object.values(weekEndDates).findIndex((date) => {
			return moment(date).subtract(1, 'days').isAfter(moment());
		}) + 1
	];
}
