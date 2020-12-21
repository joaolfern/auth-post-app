const Joi = require('@hapi/joi')

module.exports = {
    storeUserValidation: (req, res) => {
        return Joi.object({
            display_name: Joi
                .string()
                .min(1)
                .max(50)
                .required(),
            name: Joi
                .string()
                .min(4)
                .max(15)
                .required(),
            email: Joi
                .string()
                .max(500)
                .required()
                .email(),
            password: Joi
                .string()
                .max(300)
                .required(),
            date_of_birth: Joi
                .date()
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
                .date()
        }).validate(req.body)
    },
    postValidation: (req, res) => {
        return Joi.object({
            post: Joi
                .string()
                .min(6)
                .max(280)
                .required()
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