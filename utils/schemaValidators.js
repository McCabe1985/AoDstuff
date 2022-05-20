//dependencies
const Joi = require('joi');

//schema validation
module.exports.characterSchema = Joi.object({
    character: Joi.object({
        name: Joi.string().required(),
        pointsCost: Joi.number().required().min(0),
        image: Joi.string().required(),
        legion: Joi.string().required(),
        title: Joi.string().required(),
        faction: Joi.string().required(),
        wSkill: Joi.number().required().min(0),
        bSkill: Joi.number().required().min(0),
        strength: Joi.number().required().min(1),
        toughness: Joi.number().required().min(1),
        wounds: Joi.number().required().min(1),
        initiative: Joi.number().required().min(0),
        attacks: Joi.number().required().min(0),
        leadership: Joi.number().required().min(0),
        savingThrows: Joi.string().required(),
        description: Joi.string().required(),
        equipment: Joi.string().required(),
        specialRules: Joi.string().required(),
        quote: Joi.string().required(),
    }).required()
});

