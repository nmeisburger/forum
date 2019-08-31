var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user')
var locks = require('locks')
var mutex = locks.createMutex();

router.route('/posts')
    .get((req, res) => {
        Post.find()
            .then(posts => {
                return res.send({
                    success: true,
                    error: false,
                    data: posts
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
    .post((req, res) => {
        var newPost = new Post();
        newPost.content = req.body.content;
        newPost.author_id = req.body.author_id;
        newPost.author = req.body.author;
        newPost.save()
            .then(post => {
                return res.send({
                    success: true,
                    error: false,
                    data: post
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
    .put((req, res) => {
        User.verifyAuth(req.body.voter_id, req.body.password, function (success, error, data) {
            if (error) {
                return res.send({
                    success: false,
                    error: true,
                    data: "Unable to verify credentials"
                })
            }
            if (!success) {
                return res.send({
                    success: false,
                    error: false,
                    data: "Invalid credentials"
                })
            }
            mutex.lock(
                function () {
                    Post.findById(req.body.post_id)
                        .then(post => {
                            let newVoters = post.voters;
                            if (newVoters.includes(req.body.voter_id)) {
                                mutex.unlock();
                                return res.send({
                                    success: false,
                                    error: false,
                                    data: 'Repeat Voter'
                                });
                            }
                            Post.findByIdAndUpdate(post._id, {
                                $push: { voters: req.body.voter_id },
                                $inc: { votes: 1 }
                            }, { new: true })
                                .then(post => {
                                    mutex.unlock();
                                    return res.json({
                                        success: true,
                                        error: false,
                                        data: 'Vote successful'
                                    })
                                })
                                .catch(err => {
                                    mutex.unlock();
                                    return res.json({
                                        success: false,
                                        error: true,
                                        data: err
                                    })
                                })
                        })
                        .catch(err => {
                            mutex.unlock();
                            return res.send({
                                success: false,
                                error: true,
                                data: err
                            })
                        })
                }
            )
        })
    })
    .delete((req, res) => {
        User.verifyAuthAdmin(req.query.admin_id, req.query.admin_password, function (success, error, data) {
            if (error) {
                return res.send({
                    success: false,
                    error: true,
                    error: data,
                    data: 'Unable to verify credentials'
                });
            }
            if (!success) {
                return res.send({
                    success: false,
                    error: false,
                    data: "Invalid ID or password"
                });
            }
            Post.findByIdAndRemove(req.query.post_id)
                .then(response => {
                    return res.send({
                        success: true,
                        error: false,
                        data: 'Post deleted successfully'
                    });
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

router.get('/myposts', (req, res) => {
    Post.find({ author_id: req.query.id })
        .then(posts => {
            return res.send({
                success: true,
                error: false,
                data: posts
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

router.get('/topposts', (req, res) => {
    Post.find()
        .then(posts => {
            let sorted = posts.sort(function (a, b) { return (b.votes - a.votes) });
            let top5 = sorted.slice(0, 5);
            return res.send({
                success: true,
                error: false,
                data: top5
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

router.delete('/deletemypost', (req, res) => {
    Post.findById(req.query.post_id)
        .then(post => {
            User.verifyAuth(post.author_id, req.query.author_password, function (success, error, data) {
                if (error) {
                    return res.send({
                        success: false,
                        error: true,
                        error: data,
                        data: 'Unable to verify credentials'
                    });
                }
                if (!success) {
                    return res.send({
                        success: false,
                        error: false,
                        data: "Invalid ID or password"
                    });
                }
                Post.findByIdAndRemove(req.query.post_id)
                    .then(response => {
                        return res.send({
                            success: true,
                            error: false,
                            data: 'Post deleted successfully'
                        });
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
        .catch(err => {
            return res.send({
                success: false,
                error: true,
                data: err
            })
        })
})

module.exports = router;