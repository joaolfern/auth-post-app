
function formatNumber(number) {
    if (number >= 1000000)
        return `${parseFloat((number / 1000000).toFixed(3))} mi`
    else if (number >= 2000)
        return `${parseFloat((number / 1000).toFixed(1))} mil`
    else
        return number
}

export default formatNumber