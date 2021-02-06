'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var FreelancersSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please send a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    user_id: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    phone: {
        type: String
    },
    about: {
        type: String
    },
    skills: {
        type: Array
    },
    hobbys: {
        type: Array
    },
    address: {
        city: {
            type: String,
            required: true
        },
        countryCode: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Freelancers', FreelancersSchema);