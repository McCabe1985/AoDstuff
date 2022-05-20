const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//model schema

const articleSchema = new Schema({
    title: String,
    bigImg: String,
    author: String,
    articleSection: [String],
    articleImg: [String],
    category: String
})