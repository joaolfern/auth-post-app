
import moment from 'moment'

function getYearList() {
    let Start = new Date("June 26, 1900 11:13:00");
    let years = moment(moment.now()).diff(Start, 'years') + 1;
    let yearsBetween = [];
    for (let year = 0; year < years; year++)
        yearsBetween.unshift(Start.getFullYear() + year);

    return ['', ...yearsBetween]
}

function getMonthList() {
    return ['', ...moment.months()]
}

function getDayList(year, month) {
    year = year ? year : '2019'

    const array = []
    if (parseInt(month)) {
        const dateString = `${year}-${month < 10 ? `0${month}` : month}`
        const numberOfDays = moment(dateString, 'YYYY-MM').daysInMonth()

        for (let i = 1; i <= numberOfDays; i++)
            array.push(i)

        return ['', ...array]
    }
    const days = 31

    for (let i = 1; i <= days; i++)
        array.push(i)

    return ['', ...array]
}

export { getYearList, getMonthList, getDayList }