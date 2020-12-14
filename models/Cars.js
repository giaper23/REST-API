const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    brand: String,
    model: String,
    engine: String,
    manual: Boolean,
    plates: String,
    category: String,
    price: Number,
    status: String
});

module.exports = mongoose.model('Cars', CarSchema);