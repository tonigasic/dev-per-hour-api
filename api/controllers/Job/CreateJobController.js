var Jobs = require('../../models/JobModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.createJob = function(req, res) {
    let title = req.body.title;
    let userId = req.body.userId;
    let priceType = req.body.priceType;
    let priceLow = req.body.priceLow || 0;
    let priceHigh = req.body.priceHigh || 0;
    let hoursLow = req.body.hoursLow || 0;
    let hoursHigh = req.body.hoursHigh || 0;
    let durationType = req.body.durationType;
    let duration = req.body.duration;
    let experience = req.body.experience;
    let description = req.body.description;
    let skills = req.body.skills || [];
    let appliedFreelancers = req.body.appliedFreelancers || [];

    let errorMessage = validateRequest(req.body);

    if (errorMessage) {
        return res.status(400).send(errorMessage);
    }

    let jobData = {
        title: title,
        user_id: userId,
        price_type: priceType,
        price_low: priceLow,
        price_high: priceHigh,
        hours_low: hoursLow,
        hours_high: hoursHigh,
        duration_type: durationType,
        duration: duration,
        experience: experience,
        description: description,
        skills: skills,
        applied_freelancers: appliedFreelancers,
    };

    var JobsSchema = mongoose.model('Jobs');
    var job = new JobsSchema(jobData);

    job.save(function (err) {
        if (err && err.message) {
            console.log(err.message)
            return res.status(400).send(err.message);
        }
        return res.status(200).json(job);
    })
};

function validateRequest(body) {
    if (!body.title) {
        return 'Please pass the title in the request body!'
    }
    if (!body.userId) {
        return 'Please pass the user in the request body!'
    }
    if (!body.priceType) {
        return 'Please pass the price type in the request body!'
    }
    if (!body.durationType) {
        return 'Please pass the duration type in the request body!'
    }
    if (!body.duration) {
        return 'Please pass the duration in the request body!'
    }
    if (!body.experience) {
        return 'Please pass the experience in the request body!'
    }
    if (!body.description) {
        return 'Please pass the description in the request body!'
    }

    return null;
}