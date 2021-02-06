module.exports = function(app) {
    var authenticationController = require('../controllers/User/AuthenticationController');
    var UserController = require('../controllers/User/UserController');
    var UserUpdateController = require('../controllers/User/UserUpdateController');
    var CreateFreelancerController = require('../controllers/Freelancer/CreateFreelancerController');
    var GetFreelancerController = require('../controllers/Freelancer/GetFreelancerController');
    var UpdateFreelancerController = require('../controllers/Freelancer/UpdateFreelancerController');

    app.route('/user')
        .post(UserController.createUser);

    app.route('/user/:id')
        .put(UserUpdateController.updateUser);

    app.route('/authenticate')
        .post(authenticationController.authenticate);

    app.route('/freelancer')
        .post(CreateFreelancerController.createFreelancer);

    app.route('/freelancer')
        .get(GetFreelancerController.getFreelancerList);

    app.route('/freelancer/:id')
        .get(GetFreelancerController.getFreelancer);

    app.route('/freelancer/:id')
        .put(UpdateFreelancerController.updateFreelancer);
    
    app.route('/freelancer/user/:id')
        .get(GetFreelancerController.getFreelancerByUserId);
};