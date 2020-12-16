const Post = require("../models/Post");
const { postValidation } = require('../validation')

module.exports = {
    index: async (req, res) => {
        try {
            const posts = await Post.find();
            res.json(posts);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    store: async (req, res) => {
        const { name, description } = req.body
        const { _id } = req.user

        const { error } = postValidation(req, res)
        if (error)
            return res.status(400).send(error.details[0].message)

        const post = new Post({ name, description, user: _id })

        try {
            const savedPost = await post.save()
            res.json(savedPost)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    search: async (req, res) => {
        const { match } = req.params;
        const pattern = new RegExp(`${match}`, "ig");

        try {
            const foundRegistry = await Post.find({
                $or: [{ name: { $regex: pattern } }, { description: { $regex: pattern } }]
            });

            res.json(foundRegistry);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedRegistry = await Post.deleteOne({ _id: id });
            res.json(deletedRegistry);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { name, description, user } = req.body;

        try {
            const updatedRegistry = await Post.updateOne(
                { _id: id },
                { $set: { name, description, user } }
            );
            res.json(updatedRegistry);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    profile: async (req, res) => {
        const { _id } = req.user

        try {
            const posts = await Post.find({ user: _id });
            res.json(posts);
        } catch (err) {
            res.status(400).send(err);
        }
    },
};
