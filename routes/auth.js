var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.get('/login', (req, res) => {
    User.findOne({ email: req.query.email })
        .then(user => {
            if (!user) {
                return res.send({
                    success: false,
                    error: false,
                    data: "Invalid Email"
                });
            }
            if (user.validatePassword(req.query.password)) {
                return res.send({
                    success: true,
                    error: false,
                    data: user
                });
            }
            return res.send({
                success: false,
                error: false,
                data: "Invalid Password"
            })
        })
        .catch(err => {
            return res.send({
                success: false,
                error: true,
                data: err
            });
        })
})

router.route('/user')
    .get((req, res) => {
        User.verifyAuthAdmin(req.query.id, req.query.password, function (success, error, data) {
            if (error) {
                return res.send({
                    success: false,
                    error: true,
                    data: "Error Verifying Credentials"
                })
            }
            if (!success) {
                return res.send({
                    success: false,
                    error: false,
                    data: "Invalid admin credentials"
                })
            }
            User.find()
                .then(users => {
                    return res.send({
                        success: true,
                        error: false,
                        data: users
                    })
                })
                .catch(err => {
                    return res.send({
                        success: false,
                        error: true,
                        data: err
                    })
                })
        })
    })
    .post((req, res) => {
        User.verifyEmail(req.body.email, function (success, error, data) {
            if (error) {
                return res.send({
                    success: false,
                    error: true,
                    data: "Error checking email"
                });
            }
            if (!success) {
                return res.send({
                    success: false,
                    error: false,
                    data: "Email already in use"
                });
            }
            var newUser = new User();
            newUser.email = req.body.email;
            newUser.password = newUser.hashPassword(req.body.password);
            newUser.name = req.body.name;
            newUser.save()
                .then(user => {
                    return res.send({
                        success: true,
                        eror: false,
                        data: user
                    });
                })
                .catch(err => {
                    return res.send({
                        success: false,
                        error: true,
                        data: err
                    });
                })
        })
    })
    .put((req, res) => {
        User.verifyAuthAdmin(req.body.admin_id, req.body.admin_password, function (success, error, data) {
            if (error) {
                return res.send({
                    success: false,
                    error: true,
                    data: "Error Verifying Credentials"
                })
            }
            if (!success) {
                return res.send({
                    success: false,
                    error: false,
                    data: "Invalid admin credentials"
                })
            }
            User.findByIdAndUpdate(req.body.user_id, {admin: true})
                .then(user => {
                    return res.send({
                        success: true,
                        error: false,
                        data: "User promoted to admin successfully"
                    })
                })
                .catch(err => {
                    return res.send({
                        success: false,
                        error: true,
                        data: err
                    })
                })
        })
    })
    .delete((req, res) => {
        console.log(req.query)
        User.verifyAuthAdmin(req.query.admin_id, req.query.admin_password, function (success, error, data) {
            if (error) {
                return res.send({
                    success: false,
                    error: true,
                    data: "Error Verifying Credentials"
                })
            }
            if (!success) {
                return res.send({
                    success: false,
                    error: false,
                    data: "Invalid admin credentials"
                })
            }
            User.findByIdAndRemove(req.query.user_id)
                .then(user => {
                    return res.send({
                        success: true,
                        error: false,
                        data: "Account removed successfully"
                    })
                })
                .catch(err => {
                    return res.send({
                        success: false,
                        error: true,
                        data: err
                    })
                })
        })
    })


module.exports = router;