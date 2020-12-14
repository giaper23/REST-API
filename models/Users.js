const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    token: String
});

module.exports = mongoose.model('Users', UserSchema);