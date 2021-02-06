var Freelancers = require('../../models/FreelancersModel');
require('dotenv').config();
var mongoose = require('mongoose');

exports.createFreelancer = function(req, res) {
    let email = req.body.email;
    let user_id = req.body.userId;
    let picture = req.body.picture || null;
    let name = req.body.name;
    let profession = req.body.profession;
    let rating = req.body.rating;
    let phone = req.body.phone || null;
    let about = req.body.about || null;
    let skills = req.body.skills || [];
    let hobbys = req.body.hobbys || [];
    let address = req.body.address;

    let errorMessage = validateRequest(req.body);

    if (errorMessage) {
        return res.status(400).send(errorMessage);
    }

    let freelancerData = {
        email: email,
        user_id: user_id,
        picture: picture,
        name: name,
        profession: profession,
        rating: rating,
        phone: phone,
        about: about,
        skills: skills,
        hobbys: hobbys,
        address: address
    };

    var FreelancersSchema = mongoose.model('Freelancers');
    var freelancer = new FreelancersSchema(freelancerData);

    freelancer.save(function (err) {
        if (err && err.message) {
            console.log(err.message)
            return res.status(400).send(err.message);
        }
        return res.status(200).json(freelancer);
    })
};

function validateRequest(body) {
    if (!body.email) {
        return 'Please pass email in the request body!'
    }
    if (!body.userId) {
        return 'Please pass user in the request body!'
    }
    if (!body.name) {
        return 'Please pass name in the request body!'
    }
    if (!body.profession) {
        return 'Please pass profession in the request body!'
    }
    if (!body.rating) {
        return 'Please pass rating in the request body!'
    }
    if (!body.address) {
        return 'Please pass the address in the request body!'
    }

    return null;
}