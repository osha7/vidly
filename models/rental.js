const mongoose = require('mongoose');
const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            // absolute essential:
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50,
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        // customerId: Joi.string().required(),
        customerId: Joi.objectId().required(),
        // movieId: Joi.string().required()
        movieId: Joi.objectId().required()
                //  postman will return: "customerId" with value "1234" fails to match the valid mongo id pattern
    };
    return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validate = validateRental;