var Users = require('./../models/UserModel');
require('dotenv').config();

exports.authenticate = function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || ! password) {
        return res.status(400).send('Please pass email and password in the request body!');
    }
    // fetch the user and test password verification
    Users.findOne({ email: email }, function(err, user) {
        if (err || !user) {
            return res.status(404).send('The email address that you\'ve entered doesn\'t match any account!');
        }

        // test a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (!err && isMatch) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).json(user);
            }
            return res.status(403).send('The password that you\'ve entered is incorrect!');
        });
    });
};