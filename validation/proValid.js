const joi = require("joi");

function validatePro(data) {
    return joi
        .object({})
        .validate(data, { abortEarly: true });
}

module.exports = { validatePro };
