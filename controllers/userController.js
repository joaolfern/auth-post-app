const User = require('../models/User')
const { storeValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    index: async (req, res) => {

        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            res.status(400).send(e)
        }
    },
    store: async (req, res) => {
        const { name, email, password } = req.body

        //validates
        const { error } = storeValidation(req, res)
        if (error)
            return res.status(400).send(error.details[0].message)

        //checks if user already exists
        const emailExists = await User.findOne({ email })
        if (emailExists)
            return res.status(400).send('Email already exists')

        //hashes passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creates a new user
        const user = new User({ name, email, password: hashedPassword })

        try {
            const savedUser = await user.save()
            res.send({ user: savedUser.id })

        } catch (e) {
            res.status(400).send(e)
        }
    },
    search: async (req, res) => {
        const { match } = req.params
        const pattern = new RegExp(`${match}`, "ig")

        try {
            foundUsers = (
                await User.find())
                .filter(item =>
                    item["id"].match(pattern) || item.name.match(pattern)
                )
            res.json(foundUsers)
        } catch (e) {
            res.status(400).send(e)
        }
    },
    delete: async (req, res) => {
        const { id } = req.params

        deletedUser = await User.deleteOne({ _id: id })
        res.json(deletedUser)

    },
    update: async (req, res) => {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const { error } = storeValidation(req, res)
        if (error)
            return res.status(400).send(error.details[0].message)

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        try {
            const updatedUser = await User.updateOne(
                { _id: id },
                { $set: { name, email, password: hashedPassword } }
            )
            res.json(updatedUser)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body

        const { error } = loginValidation(req, res)
        if (error)
            return res.status(400).send(error.details[0].message)

        const user = await User.findOne({ email })
        if (!user)
            return res.status(400).send('Invalid email')

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword)
            return res.status(400).send('Invalid password')

        //token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)
    }
} 