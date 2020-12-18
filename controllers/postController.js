const Post = require("../models/Post")
const User = require("../models/User")
const { postValidation } = require('../validation')

module.exports = {
    index: async (req, res) => {
        try {
            const posts = await Post.find()
            res.json(posts)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    store: async (req, res) => {
        const { post } = req.body
        const { _id } = req.user

        const { error } = postValidation(req, res)
        if (error)
            return res.status(400).send(error.details[0].message)

        const newPost = new Post({ post, user: _id })

        try {
            const savedPost = await newPost.save()
            res.json(savedPost)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    search: async (req, res) => {
        const { match } = req.params
        const pattern = new RegExp(`${match}`, "ig")

        try {
            const possibleUser = await User.findOne({ name: { $regex: pattern } })

            const foundRegistry = await Post.find(
                { $or: [{ post: { $regex: pattern } }, { user: possibleUser['_id'] }] }
            );

            res.json(foundRegistry)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    delete: async (req, res) => {
        const { id: postId } = req.params
        const { _id: userId } = req.user

        try {
            const post = await Post.findOne({ _id: postId })
            if (post.user != userId)
                return res.status(401).send('Access denied')

            console.log(post.user, userId)

            const deletedRegistry = await Post.deleteOne({ _id: postId })
            res.json(deletedRegistry)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    profile: async (req, res) => {
        const { _id } = req.user

        try {
            const posts = await Post.find({ user: _id })
            res.json(posts)
        } catch (err) {
            res.status(400).send(err)
        }
    },
};
