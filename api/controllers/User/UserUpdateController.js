var Users = require('../../models/UserModel');
require('dotenv').config();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

exports.updateUser = async function (req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).send('Please send a valid id');
    }

    let userId = req.params.id;
    let errorMessage = validateRequest(req.body);

    if (errorMessage) {
        return res.status(400).send(errorMessage);
    }

    let password = req.body.password || null;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;


    let userData = {
        first_name: firstName,
        last_name: lastName
    };

    if (password) {
        await getHashFromPassword(password)
            .then(hashGeneratorObject => {
                if (hashGeneratorObject.success && hashGeneratorObject.hash) {
                    userData.password = hashGeneratorObject.hash;
                }
            })
    }

    Users.findByIdAndUpdate({ _id: userId }, userData , {}, function(err, user) {
        if (err || !user) {
            return res.status(404).send('The user doesn\'t exist!');
        }

        return res.status(200).json(user);
    });
}

function getHashFromPassword(password) {
    return new Promise((resolve) => {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) resolve({success: false});

            // hash the password using our new salt
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) resolve({success: false});
                // override the cleartext password with the hashed one
                resolve({success: true, hash: hash});
            });
        });
    })
}

function validateRequest(body) {
    if (!body.firstName) {
        return 'Please pass first name in the request body!'
    }
    if (!body.lastName) {
        return 'Please pass last name in the request body!'
    }

    return null;
}