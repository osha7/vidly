const mongoose = require('mongoose');
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    isGold: { 
        type: Boolean,
        default: false },
    phone: {
        type: String,
        required: true,
        // minlength: 10 // now in Joi
    },
});

const Customer = new mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(10),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.customerSchema = customerSchema;