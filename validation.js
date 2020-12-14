// Import Joi
const joi = require('@hapi/joi');

// Joi schema for validation of user input on register/edit user
const ValidationUserSchema = joi.object({
    username: joi.string().alphanum().min(2).required(),
    email: joi.string().email().min(6).required(),
    password: joi.string().required(),   // Should change this for more secure passwords before deployment!!
    role: joi.string().required()
    });

// Joi schema for validation of user input on create/edit car
const ValidationCarSchema = joi.object({
    brand: joi.string().min(3).required(),
    model: joi.string().min(3).required(),
    engine: joi.string().alphanum().min(4).max(6).required(),
    manual: joi.bool().required(),
    plates: joi.string().alphanum().min(5).max(7),
    category: joi.string().min(3).required(),
    price: joi.number().required(),
    available: joi.bool().required()
    });    

// Register user & Edit user validation 
exports.UserCreate = (req, res, next) => {
    const { error } = ValidationUserSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message});
    next(); // Mandatory to continue running code after this function
};

// Create car & Edit car validation
exports.CarCreate = (req, res, next) => {
    const { error } = ValidationCarSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message});
    next(); // Mandatory to continue running code after this function
};