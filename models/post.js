var mongoose = require('mongoose');

var Post = new mongoose.Schema({
    content: { type: String, required: true, trim: true, maxlength: 200 },
    author_id: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    created_at: {type: Date, default: Date.now},
    voters: {type: Array, default:[]},
    votes: {type:Number, default: 0}
})

module.exports = mongoose.model('Post', Post);