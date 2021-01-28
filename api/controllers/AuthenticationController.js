var Users = require('./../models/UserModel');
require('dotenv').config();

let response = {
    status: "",
    code: 200,
    data: null,
    message: null
};

exports.authenticate = function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || ! password) {
        response.status = 'error';
        response.code = 400;
        response.data = null;
        response.message = 'Please pass email and password in the request body!';
        return res.send(response);
    }
    // fetch the user and test password verification
    Users.findOne({ email: email }, function(err, user) {
        if (err || !user) {
            response.status = 'error';
            response.code = 404;
            response.data = null;
            response.message = 'The email address that you\'ve entered doesn\'t match any account!';
            return res.send(response);
        }

        // test a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (!err && isMatch) {
                response.status = 'success';
                response.data = user;
                response.code = 200;
                response.message = null;
                return res.send(response);
            }
            response.status = 'error';
            response.code = 403;
            response.data = null;
            response.message = 'The password that you\'ve entered is incorrect!';
            return res.send(response);
        });
    });
};