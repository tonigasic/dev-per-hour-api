var Users = require('../../models/UserModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.saveDeveloperToUser = async function (req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }

    let userId = req.params.id;
    let errorMessage = validateRequest(req.body);

    if (errorMessage) {
        return res.status(400).send(errorMessage);
    }

    let savedDevelopers = req.body.savedDevelopers;

    let userData = {
        saved_developers: savedDevelopers
    };

    Users.findByIdAndUpdate({ _id: userId }, userData , {}, function(err, user) {
        if (err || !user) {
            return res.status(404).send('The user doesn\'t exist!');
        }

        return res.status(200).json(user);
    });
}

function validateRequest(body) {
    if (!body.savedDevelopers) {
        return 'Please pass the freelancer id in the request body!'
    }

    return null;
}