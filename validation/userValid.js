const joi = require("joi");

function validateUser(data) {
    return joi
        .object({
            name: joi.string().min(2).max(50).required(),
            password: joi.string().min(2).max(50).required(),
            phone: joi
                .string()
                .min(13)
                .max(13)
                .required()
                .pattern(/^\+998\d{9}$/),
            email: joi.string().min(2).max(50).required(),
            role: joi.string().min(2).max(50).required(),
        })
        .validate(data, { abortEarly: true });
}

module.exports = { validateUser };
