'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobsSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price_low: {
        type: Number
    },
    price_high: {
        type: Number
    },
    hours_low: {
        type: Number
    },
    hours_high: {
        type: Number
    },
    duration_type: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    applied_freelancers: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Jobs', JobsSchema);