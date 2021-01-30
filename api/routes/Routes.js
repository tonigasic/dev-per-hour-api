module.exports = function(app) {
    var authenticationController = require('../controllers/AuthenticationController');
    var UserController = require('../controllers/UserController');

    app.route('/user')
        .post(UserController.createUser);

    app.route('/authenticate')
        .post(authenticationController.authenticate);
}