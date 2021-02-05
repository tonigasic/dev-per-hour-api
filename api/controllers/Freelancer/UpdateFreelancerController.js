var Freelancers = require('../../models/FreelancersModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.updateFreelancer = function(req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }
    let freelancerId = req.params.id;
    let body = req.body;

    if (!body) {
        return res.status(400).send('Please send a valid body');
    }

    Freelancers.findByIdAndUpdate(freelancerId, body , {}, function(err, freelancer) {
        if (err || !freelancer) {
            return res.status(404).send('The freelancer doesn\'t exist!');
        }

        return res.status(200).json(body);
    });
};