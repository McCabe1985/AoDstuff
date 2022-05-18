const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//model
const CharacterSchema = new Schema({
    name: String,
    pointsCost: Number,
    image: String,
    legion: String,
    title: String,
    faction: String,
    wSkill: Number,
    bSkill: Number,
    strength: Number,
    toughness: Number,
    wounds: Number,
    initiative: Number,
    attacks: Number,
    leadership: Number,
    savingThrows: String,
    description: String,
    equipment: String,
    specialRules: String,
    quote: String
})

//export
module.exports = mongoose.model('Character', CharacterSchema);