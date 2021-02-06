var Freelancers = require('../../models/FreelancersModel');
var UserModel = require('../../models/UserModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.getSavedDevelopers = function(req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }
    let userId = req.params.id;

    UserModel.findById(userId , function(err, user) {
        if (err || !user) {
            return res.status(404).send('The user doesn\'t exist!');
        }

        Freelancers.find({_id: { '$in' : user.saved_developers }} , function(err, freelancers) {
            if (err) {
                return res.status(404).send('The freelancers could not be fetched!');
            }

            return res.status(200).json(freelancers);
        });
    });
};