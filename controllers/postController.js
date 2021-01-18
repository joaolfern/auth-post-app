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
    index: async (req, res) => {
        const { _id: userId } = req.user

        const user = await User.find({ _id: userId })

        if (!user[0]) {
            return res.json([])
        }

        const followedUsers = await User.find({ _id: { $in: (user[0].following || []) } })
        const timelinePosts = [...followedUsers, ...user].reduce(
            (acc, item) => [...acc, ...item.posts], []
        )


        const posts = await Post.find({
            $or:
                [{ _id: { $in: timelinePosts } }, { retweets: userId }]
        })

        res.json(posts)
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
    profile: async (req, res) => {
        const { _id } = req.user

        try {
            const posts = await Post.find({ user: _id })
            res.json(posts)
        } catch (err) {
            res.status(400).json(err)
        }
    },
    favorite: async (req, res) => {
        const { _id: userId } = req.user
        const { id: postId } = req.params

        const result = await Post.updateOne({ _id: postId }, {
            $addToSet: { favorites: userId }
        })

        if (result.nModified === 0) {
            await Post.updateOne({ _id: postId }, {
                $pull: { favorites: userId }
            })
        }
        res.json(`Post ${postId} was ${result.nModified ? '' : 'un'}liked by ${userId}`)
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
        res.json(`Post ${postId} was ${result.nModified ? '' : 'un'}retweeted by ${userId}`)
    }
};
