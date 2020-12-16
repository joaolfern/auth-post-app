const Joi = require('@hapi/joi')


module.exports = {
    storeValidation: (req, res) => {
        const schema = Joi.object({
            name: Joi
                .string()
                .min(4)
                .required(),
            email: Joi
                .string()
                .min(6)
                .required()
                .email(),
            password: Joi
                .string()
                .min(6)
                .required()
        })
        return schema.validate(req.body)
    },
    loginValidation: (req, res) => {
        const schema = Joi.object({
            email: Joi
                .string()
                .min(6)
                .required()
                .email(),
            password: Joi
                .string()
                .min(6)
                .required()
        })
        return schema.validate(req.body)
    },
    postValidation: (req, res) => {
        return Joi.object({
            name: Joi
                .string()
                .min(6)
                .max(100)
                .required(),
            description: Joi
                .string()
                .min(5)
                .max(500)
                .required()
        }).validate(req.body)
    }
}