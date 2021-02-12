module.exports = function(app) {
    var authenticationController = require('../controllers/User/AuthenticationController');
    var UserController = require('../controllers/User/UserController');
    var UserUpdateController = require('../controllers/User/UserUpdateController');
    var UserSaveDeveloper = require('../controllers/User/UserSaveDeveloper');
    var UserGetDevelopers = require('../controllers/User/UserGetDevelopers');
    var CreateFreelancerController = require('../controllers/Freelancer/CreateFreelancerController');
    var GetFreelancerController = require('../controllers/Freelancer/GetFreelancerController');
    var UpdateFreelancerController = require('../controllers/Freelancer/UpdateFreelancerController');
    var GetJobController = require('../controllers/Job/GetJobController');
    var CreateJobController = require('../controllers/Job/CreateJobController');
    var UpdateJobController = require('../controllers/Job/UpdateJobController');

    app.route('/user')
        .post(UserController.createUser);

    app.route('/user/:id')
        .put(UserUpdateController.updateUser);

    app.route('/user/:id/developer')
        .put(UserSaveDeveloper.saveDeveloperToUser);

    app.route('/user/:id/developer')
        .get(UserGetDevelopers.getSavedDevelopers);

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

    app.route('/job')
        .post(CreateJobController.createJob);

    app.route('/job')
        .get(GetJobController.getJobsList);

    app.route('/job/:id')
        .get(GetJobController.getJob);

    app.route('/job/user/:id')
        .get(GetJobController.getJobByUserId);

    app.route('/job/:id')
        .put(UpdateJobController.updateJob);
};