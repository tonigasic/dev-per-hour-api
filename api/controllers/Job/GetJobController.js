var Jobs = require('../../models/JobModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.getJobsList = function(req, res) {
    Jobs.find({} , function(err, jobs) {
        if (err || !jobs) {
            return res.status(404).send('There are no jobs in the database!');
        }

        return res.status(200).json(jobs);
    });
};

exports.getJob = function(req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }
    let jobId = req.params.id;

    Jobs.findById(jobId , function(err, job) {
        if (err || !job) {
            return res.status(404).send('This job doesn\'t exist!');
        }

        return res.status(200).json(job);
    });
};

exports.getJobByUserId = function(req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }
    let userId = req.params.id;

    Jobs.findOne({user_id: userId} , function(err, job) {
        if (err || !job) {
            return res.status(404).send('This job doesn\'t exist!');
        }

        return res.status(200).json(job);
    });
};