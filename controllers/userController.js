const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    signUpValidation2,
    loginValidation,
    updateUserValidation,
    signUpValidation1
} = require('../validation')
const randomId = require('random-id')

module.exports = {
    index: async (req, res) => {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            res.status(400).json(e)
        }
    },
    store: async (req, res) => {
        const { display_name, email, password, date_of_birth, photo } = req.body
        let name = display_name

        if (!password) { //first validation
            const { error } = signUpValidation1(req, res)
            if (error)
                return res.status(401).json(error.details[0].message)

            const emailExists = await User.findOne({ email })
            if (emailExists)
                return res.status(401).json('Email already exists')

            return res.json('First validation passed')
        }
        if (!photo) {
            //validates password
            const { error } = signUpValidation2(req, res)
            if (error)
                return res.status(401).json(error.details[0].message)

            return res.json('Second validation passed')
        }

        const nameExists = await User.findOne({ display_name })
        if (nameExists)
            name = display_name + randomId(4, 'aA0')

        //hashes passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creates a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            display_name,
            date_of_birth,
            photo
        })

        try {
            const savedUser = await user.save()
            res.json(`${savedUser.name} registered`)
        } catch (e) {
            res.status(400).json(e)
        }
    },
    search: async (req, res) => {
        const { id } = req.params

        foundUsers = (
            await User.find({
                _id: id
            }))
        res.json(foundUsers)

    },
    delete: async (req, res) => {
        try {
            const { id } = req.params

            const deletedUser = await User.deleteOne({ _id: id })
            res.json(deletedUser)
        } catch (e) {
            res.json(e)
        }
    },
    update: async (req, res) => {
        const { id } = req.params;

        const { error } = updateUserValidation(req, res)
        if (error)
            return res.status(400).json(error.details[0].message)

        try {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.password, salt)

                const updatedUser = await User.updateOne(
                    { _id: id },
                    { ...req.body, password: hashedPassword }
                )
                res.json(updatedUser)
            }
            else {
                const updatedUser = await User.updateOne(
                    { _id: id },
                    { ...req.body }
                )
                res.json(updatedUser)
            }
        } catch (err) {
            res.status(400).json(err)
        }


    },
    login: async (req, res) => {
        const { email, password } = req.body

        const { error } = loginValidation(req, res)
        if (error)
            return res.status(401).json(error.details[0].message)

        const user = await User.findOne({ email })
        if (!user)
            return res.status(401).json('Invalid email')

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword)
            return res.status(401).json('Invalid password')

        //token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).json(token)
    },
    follow: async (req, res) => {
        const { id: followed } = req.params
        const { _id: follower } = req.user

        const updatedFollower = await User.updateOne(
            { _id: follower },
            { $push: { following: followed } }
        )

        const updatedFollowed = await User.updateOne(
            { _id: followed },
            { $push: { followers: follower } }
        )
        res.json(`${follower} followed ${followed}`)


    },
    unfollow: async (req, res) => {
        const { id: unfollowed } = req.params
        const { _id: unfollower } = req.user

        const updatedUnfollower = await User.updateOne(
            { _id: unfollower },
            { $pull: { following: unfollowed } }
        )

        const updatedUnfollowed = await User.updateOne(
            { _id: unfollowed },
            { $pull: { followers: unfollower } }
        )

        res.json(`${unfollower} unfollowed ${unfollowed}`)
    },
    profile: async (req, res) => {
        const { _id } = req.user
        const user = await User.find({ _id })

        res.json(user[0])
    }
} 