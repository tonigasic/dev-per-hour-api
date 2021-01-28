module.exports = function(app) {
    var testController = require('../controllers/AuthenticationController');

    // todoList Routes
    app.route('/authenticate')
        .post(testController.authenticate);
}