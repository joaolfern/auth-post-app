import datetimeDifference from "datetime-difference"

export default (earlierDate, laterDate = Date.now()) => {
    earlierDate = new Date(earlierDate)
    laterDate = new Date(laterDate)
    const timeDiff = datetimeDifference(earlierDate, laterDate)
    const timeDiffStamp = Object.entries(timeDiff).find(timestamp => timestamp[1])

    const parseStamp = {
        'seconds': 's',
        'minutes': 'min',
        'hours': 'h',
    }

    if (timeDiffStamp[0].days > 7) {
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(earlierDate)
        return `${earlierDate.getDay()} de ${month} ${timeDiffStamp[0].years && earlierDate.getYear()}`
    }

    return {
        label: parseStamp[timeDiffStamp[0]] ? parseStamp[timeDiffStamp[0]] :
            timeDiffStamp[1] != 1 ?
                timeDiffStamp[0] :
                timeDiffStamp[0].slice(0, timeDiffStamp[0].length - 1),
        value: timeDiffStamp[1]
    }
}