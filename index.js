//dependencies
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Character = require('./models/character');

//connect mongoose
mongoose.connect('mongodb://localhost:27017/horusHeresyCharacters').then(() => {
    console.log("we are connected to Mongo");
}).catch(err => {
    console.log("oh no, error, we are not connected to Mongo")
    console.log(err)
});

//arrays
const legions = [
    'I Legion, Dark Angels',
    'III Legion, Emperor\'s Children',
    'IV Legion, Iron Warriors',
    'V Legion, White Scars',
    'VI Legion, Space Wolves',
    'VII Legion, Imperial Fists',
    'VIII Legion, Night Lords',
    'IX Legion, Blood Angels',
    'X Legion, Iron Hands',
    'XII Legion, World Eaters',
    'XIII Legion, Ultramarines',
    'XIV Legion, Death Guard',
    'XV Legion, Thousand Sons',
    'XVI Legion, Luna Wolves',
    'XVII Legion, Word Bearers',
    'XVIII Legion, Salamanders',
    'XIX Legion, Raven Guard',
    'XX Legion, Alpha Legion',
    'Knights-Errant',
    'Black Shields',
    'N/A - Non-Astartes'
]
const factions = [
    'Loyalist Legiones Astartes',
    'Traitor Legiones Astartes',
    'Loyalist Mechanicum',
    'Traitor Mechanicum',
    'Loyalist Questoris Knights',
    'Traitor Questoris Knights',
    'Loyalist Titan Legions',
    'Traitor Titan Legions',
    'Loyalist Militia',
    'Traitor Militia',
    'Legio Custodes',
    'Chaos Cults',
    'Sisters of Silence',
    'Solar Auxilia',
    'Rebels',
    'Goibhniu Principalities'
]

const statValues = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'
]

//middleware
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< routes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//basic route
app.get('/', (req, res) => {
    res.render('home')
})

//view character index
app.get('/dramatis-personae', catchAsync(async (req, res) => {
    const characters = await Character.find({});
    res.render('characters/index', {
        characters
    })
}))

//create new character entry
app.get('/dramatis-personae/new', (req, res) => {
    res.render('characters/addEntry', {
        legions,
        factions,
        statValues
    })
})

app.post('/dramatis-personae', catchAsync(async (req, res) => {
    if(!req.body.character) throw new ExpressError('Invalid Character Input', 400)
        const character = new Character(req.body.character);
        await character.save();
        res.redirect(`/dramatis-personae/${character._id}`)
}))

//view character bio
app.get('/dramatis-personae/:id', catchAsync(async (req, res) => {
    const character = await Character.findById(req.params.id)
    res.render('characters/bio', {
        character
    })
}))

//Edit Entry
app.get('/dramatis-personae/:id/edit', catchAsync(async (req, res) => {
    const character = await Character.findById(req.params.id)
    res.render('characters/edit', {
        character,
        legions,
        factions,
        statValues
    })
}))

app.put('/dramatis-personae/:id', catchAsync(async (req, res) => {
    const {
        id
    } = req.params;
    const character = await Character.findByIdAndUpdate(id, {
        ...req.body.character
    })
    res.redirect(`/dramatis-personae/${character._id}`)
}))


//delete entry
app.delete('/dramatis-personae/:id', catchAsync(async (req, res) => {
    const {
        id
    } = req.params;
    await Character.findByIdAndDelete(id)
    res.redirect('/dramatis-personae');
}))

//error handler
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Internal Server Error';
    res.status(statusCode).render('error', { err })
})

//create the server
app.listen(3000, () => {
    console.log('serving on port 3000')
});