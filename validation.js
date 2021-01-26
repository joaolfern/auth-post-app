const Joi = require('@hapi/joi')

module.exports = {
    signUpValidation1: (req, res) => {
        return Joi.object({
            display_name: Joi
                .string()
                .min(1)
                .max(50)
                .required(),
            email: Joi
                .string()
                .max(500)
                .required()
                .email(),
            date_of_birth: Joi
                .date()
                .required()
        }).validate(req.body)
    },
    signUpValidation2: (req, res) => {
        return Joi.object({
            display_name: Joi
                .string()
                .min(1)
                .max(50)
                .required(),
            email: Joi
                .string()
                .max(500)
                .required()
                .email(),
            date_of_birth: Joi
                .date()
                .required(),
            password: Joi
                .string()
                .max(300)
                .min(8)
                .required()
        }).validate(req.body)
    },
    updateUserValidation: (req, res) => {
        return Joi.object({
            display_name: Joi
                .string()
                .min(1)
                .max(50),
            name: Joi
                .string()
                .min(4)
                .max(15),
            email: Joi
                .string()
                .max(500)
                .email(),
            password: Joi
                .string()
                .min(6)
                .max(300),
            date_of_birth: Joi
                .date(),
            bio: Joi
                .string()
                .max(600)
                .allow(null, ''),
            location: Joi
                .string()
                .max(30)
                .allow(null, ''),
            webpage: Joi
                .string()
                .max(100)
                .allow(null, ''),
            photo: Joi
                .string()
                .allow(null, ''),
            cover: Joi
                .string()
                .allow(null, '')
        }).validate(req.body)
    },
    postValidation: (req, res) => {
        return Joi.object({
            post: Joi
                .string()
                .min(6)
                .max(280)
                .required(),
            repliedTo: Joi
                .string()
        }).validate(req.body)
    },

    loginValidation: (req, res) => {
        return Joi.object({
            email: Joi
                .string()
                .required()
                .email(),
            password: Joi
                .string()
                .min(6)
                .required()
        }).validate(req.body)
    },
}