var Jobs = require('../../models/JobModel');
var UserModel = require('../../models/UserModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.getSavedJobs = function(req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }
    let userId = req.params.id;

    UserModel.findById(userId , function(err, user) {
        if (err || !user) {
            return res.status(404).send('The user doesn\'t exist!');
        }

        Jobs.find({_id: { '$in' : user.saved_jobs }} , function(err, jobs) {
            if (err) {
                return res.status(404).send('The jobs could not be fetched!');
            }

            return res.status(200).json(jobs);
        });
    });
};