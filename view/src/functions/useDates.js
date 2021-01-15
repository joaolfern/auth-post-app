
import moment from 'moment'
import datetimeDifference from "datetime-difference"


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

function getTimeDiff(earlierDate, laterDate = Date.now()) {
    earlierDate = new Date(earlierDate)
    laterDate = new Date(laterDate)
    const timeDiff = datetimeDifference(earlierDate, laterDate)
    const timeDiffStamp = Object.entries(timeDiff).find(timestamp => timestamp[1])

    const parseStamp = {
        'seconds': 's',
        'minutes': 'min',
        'hours': 'h',
    }

    if (timeDiff.days) {
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(earlierDate)
        return `${earlierDate.getDate()} de ${month.slice(0, -1)} ${timeDiff.years ? earlierDate.getFullYear() : ''}`
    }

    return {
        label: parseStamp[timeDiffStamp[0]] ? parseStamp[timeDiffStamp[0]] :
            timeDiffStamp[1] != 1 ?
                timeDiffStamp[0] :
                timeDiffStamp[0].slice(0, timeDiffStamp[0].length - 1),
        value: timeDiffStamp[1]
    }

}

export { getYearList, getMonthList, getDayList, getTimeDiff }