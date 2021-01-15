module.exports = function(app) {
    var testController = require('../controllers/testController');

    // todoList Routes
    app.route('/test')
        .get(testController.listSomething);
}