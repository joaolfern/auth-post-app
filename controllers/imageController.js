const Image = require('../models/Image')

module.exports = {
    store: async (req, res) => {
        const { originalname: photoName, size, key, location: url = '' } = req.file

        try {
            const image = await Image.create({
                photoName,
                size,
                key,
                url
            })
            res.json(image)
        } catch (e) {
            res.status(400).json(e)
        }

    },
    index: async (req, res) => {
        try {
            const images = await Image.find()
            res.json(images)
        } catch (e) {
            res.status(400).json(e)
        }
    },
    delete: async (req, res) => {
        const { id: _id } = req.params

        const deletedImage = await Image.findById(_id)
        await deletedImage.remove()
        res.json(deletedImage)
    },
}