var Freelancers = require('../../models/FreelancersModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.getFreelancerList = function(req, res) {
    Freelancers.find({} , function(err, freelancers) {
        if (err || !freelancers) {
            return res.status(404).send('There are no freelancers in the database!');
        }

        return res.status(200).json(freelancers);
    });
};

exports.getFreelancer = function(req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }
    let freelancerId = req.params.id;

    Freelancers.findById(freelancerId , function(err, freelancer) {
        if (err || !freelancer) {
            return res.status(404).send('The freelancer doesn\'t exist!');
        }

        return res.status(200).json(freelancer);
    });
};

exports.getFreelancerByUserId = function(req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }
    let userId = req.params.id;

    Freelancers.findOne({user_id: userId} , function(err, freelancer) {
        if (err || !freelancer) {
            return res.status(404).send('The freelancer doesn\'t exist!');
        }

        return res.status(200).json(freelancer);
    });
};