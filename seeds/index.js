//dependencies
const mongoose = require('mongoose');
const Factions = require('./factions');
const Legions = require('./legions');
const {
    firstNames,
    lastNames
} = require('./seedHelpers');
const Character = require('../models/character');


//connect mongoose
mongoose.connect('mongodb://localhost:27017/horusHeresyCharacters').then(() => {
    console.log("we are connected to Mongo");
}).catch(err => {
    console.log("oh no, error, we are not connected to Mongo")
    console.log(err)
});


//generate random data from seedHelpers

const sample = array => array[Math.floor(Math.random() * array.length)];
const randomSixteen = Math.floor(Math.random() * 16);
const randomTwentyOne = Math.floor(Math.random() * 21);

function randomStats(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


//remove entries from database and create new entries
const seedDB = async () => {
    await Character.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const char = new Character({
            name: `${sample(firstNames)} ${sample(lastNames)}`,
            pointsCost: 0,
            image: 'https://wh40k.lexicanum.com/mediawiki/images/5/52/Unknown.jpg',
            legion: `${Legions[randomTwentyOne]}`,
            title: 'TBA',
            faction: `${Factions[randomSixteen]}`,
            wSkill: randomStats(5, 8),
            bSkill: randomStats(5, 8),
            strength: randomStats(4, 7),
            toughness: randomStats(4, 7),
            wounds: randomStats(2, 5),
            initiative: randomStats(3, 6),
            attacks: randomStats(2, 6),
            leadership: randomStats(8, 11),
            savingThrows: `3+`,
            description: 'Lorem ipsum dolor sit amet. Qui voluptatem dolorem est esse doloribus a assumenda placeat ut quia odit 33 voluptas molestias aut incidunt ullam. Cum quos dignissimos qui commodi adipisci et voluptate quae ut eaque sit labore reiciendis sed consequatur dolores. Non modi ipsa 33 earum soluta in officiis rerum nam neque quos in quibusdam sunt sed fugit recusandae et neque exercitationem!',
            equipment: 'Lorem ipsum dolor sit amet. Qui voluptatem dolorem est esse doloribus a assumenda placeat ut quia odit 33',
            specialRules: 'Lorem ipsum dolor sit amet. Qui voluptatem dolorem est esse doloribus a assumenda placeat ut quia odit 33',
            quote: 'Lorem ipsum dolor sit amet. Qui voluptatem dolorem est esse doloribus a assumenda placeat ut quia odit 33'

        });
        await char.save();
    }
}

seedDB()