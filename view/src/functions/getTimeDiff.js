import datetimeDifference from "datetime-difference"

export default (earlierDate, laterDate = Date.now()) => {
    const timeDiff = datetimeDifference(new Date(earlierDate), new Date(laterDate))
    const timeDiffStamp = Object.entries(timeDiff).find(timestamp => timestamp[1])

    const parseStamp = {
        'seconds': 's',
        'minutes': 'min',
        'hours': 'h',
    }

    return [parseStamp[timeDiffStamp[0]] || timeDiffStamp[0], timeDiffStamp[1]]
}