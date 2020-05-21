const mongoose = require('mongoose');

const Message = mongoose.model('message', {
    name: String,
    message: String
});

module.exports = Message;