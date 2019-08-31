var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var User = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    admin: { type: Boolean, default: false }
})

User.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

User.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, 10);
}

User.statics.verifyAuth = function (id, password, callback) {
    this.findById(id)
        .then(user => {
            if (!user) {
                return callback(false, false, "Invalid ID");
            }
            if (user.validatePassword(password)) {
                return callback(true, false, user);
            } else {
                return callback(false, false, "Invalid Password");
            }
        })
        .catch(err => {
            return callback(false, true, err);
        })
}

User.statics.verifyAuthAdmin = function (id, password, callback) {
    this.findById(id)
        .then(user => {
            if (!user) {
                return callback(false, false, "Invalid ID");
            }
            if (user.validatePassword(password) && user.admin) {
                return callback(true, false, user);
            } else {
                return callback(false, false, "Invalid Admin Password");
            }
        })
        .catch(err => {
            console.log(err)
            return callback(false, true, err);
        })
}

User.statics.verifyEmail = function (email, callback) {
    this.findOne({ email: email })
        .then(user => {
            if (!user) {
                return callback(true, false, "Email Not In Use");
            }
            return callback(false, false, "Email In Use");
        })
        .catch(err => {
            return callback(false, true, err);
        })
}

module.exports = mongoose.model('User', User);