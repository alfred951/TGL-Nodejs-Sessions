const Joi = require('joi')

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    currency: Joi.string().required(),
    description: Joi.string().required(),
})

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(401).send(error.details[0].message);
    }
    next();
}

module.exports = validateProduct;