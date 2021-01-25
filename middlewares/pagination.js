module.exports = function (req, res) {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5


    const { model } = req

    if (page < 1) {
        return res.status(400).json('Invalid page')
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    results.results = model.slice(startIndex, endIndex)

    if ((page * limit) < model.length)
        results.next = {
            page: page + 1,
            limit: limit
        }

    if (page > 1)
        results.previous = {
            page: page - 1,
            limit: limit
        }

    results.total = {
        items: model.length,
        pages: Math.ceil(model.length / limit)
    }

    res.json(results)
}