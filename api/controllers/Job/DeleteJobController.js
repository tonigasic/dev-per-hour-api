var Jobs = require('../../models/JobModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.deleteJob = function(req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }
    let jobId = req.params.id;

    Jobs.deleteOne({ _id: jobId }, {}, function(err, job) {
        if (err || !job) {
            return res.status(404).send('This job doesn\'t exist!');
        }

        return res.status(200).json(job);
    });
};