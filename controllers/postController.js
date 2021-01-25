const Post = require("../models/Post")
const User = require("../models/User")
const { postValidation } = require('../validation')

module.exports = {
    all: async (req, res) => {
        try {
            const posts = await Post.find()
            res.json(posts)
        } catch (e) {
            res.status(400).json(e)
        }
    },
    index: async (req, res, next) => {
        let { id: userId } = req.params
        let posts, user

        if (!userId) {
            userId = req.user._id
            user = await User.find({ _id: userId })

            if (!user[0]) {
                return res.json([])
            }
            const followedUsers = await User.find({ _id: { $in: (user[0].following || []) } })
            const timelinePosts = [...followedUsers, ...user].reduce(
                (acc, item) => [...acc, ...item.posts], []
            )

            posts = await Post.find({
                $or:
                    [{ _id: { $in: timelinePosts } }, { retweets: userId }]
            }).sort({ 'date': -1 })

        } else {
            user = await User.find({ _id: userId })
            posts = await Post.find({ _id: { $in: user[0].posts } }).sort({ 'date': -1 })
        }
        req.model = posts

        next()
    },
    store: async (req, res) => {
        const { post, repliedTo } = req.body
        const { _id } = req.user

        const { error } = postValidation(req, res)
        if (error)
            return res.status(400).json(error.details[0].message)

        const newPost = new Post({ post, repliedTo, user: _id })

        try {
            const savedPost = await newPost.save()
            const updatedUser = await User.updateOne(
                { _id },
                { $push: { posts: savedPost['_id'] } }
            )

            if (repliedTo) {
                await Post.updateOne({ _id: repliedTo }, {
                    $push: { replies: savedPost['_id'] }
                })
            }

            res.json(savedPost)
        } catch (err) {
            res.status(400).json(err)
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
            res.status(400).json(err)
        }
    },
    delete: async (req, res) => {
        const { id: postId } = req.params
        const { _id: userId } = req.user

        try {
            const post = await Post.findOne({ _id: postId })
            if (post.user != userId)
                return res.status(401).json('Access denied')

            const deletedRegistry = await Post.findById(postId)
            deletedRegistry.remove()

            res.json(deletedRegistry)
        } catch (err) {
            res.status(400).json(err)
        }
    },
    like: async (req, res) => {
        const { _id: userId } = req.user
        const { id: postId } = req.params

        const result = await Post.updateOne({ _id: postId }, {
            $addToSet: { likes: userId }
        })

        if (result.nModified === 0) {
            await Post.updateOne({ _id: postId }, {
                $pull: { likes: userId }
            })

        }
        res.json({ post: postId, user: { userId }, increased: result.nModified ? true : false })
    },
    retweet: async (req, res) => {
        const { _id: userId } = req.user
        const { id: postId } = req.params

        const result = await Post.updateOne({ _id: postId }, {
            $addToSet: { retweets: userId }
        })

        if (result.nModified === 0) {
            await Post.updateOne({ _id: postId }, {
                $pull: { retweets: userId }
            })
        }
        res.json({ post: postId, user: { userId }, increased: result.nModified ? true : false })
    }
};
