//dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const reviewSchema = new Schema({
    body: String,
    rating: Number
});

module.exports = mongoose.model("Review", reviewSchema);