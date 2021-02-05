var Users = require('../../models/UserModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.createUser = function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let roles = req.body.roles;

    let errorMessage = validateRequest(req.body);

    if (errorMessage) {
        return res.status(400).send(errorMessage);
    }

    let userData = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        roles: roles
    };

    var UsersSchema = mongoose.model('Users');
    var user = new UsersSchema(userData);

    user.save(function (err) {
        if (err && err.message) {
            console.log(err.message)
            return res.status(400).send(err.message);
        }
        return res.status(200).json(user);
    })
}

function validateRequest(body) {
    if (!body.email) {
        return 'Please pass email in the request body!'
    }
    if (!body.password) {
        return 'Please pass password in the request body!'
    }
    if (!body.firstName) {
        return 'Please pass first name in the request body!'
    }
    if (!body.lastName) {
        return 'Please pass last name in the request body!'
    }
    if (!body.roles || body.roles.length < 1) {
        return 'Please pass at least one role in the request body!'
    }

    return null;
}