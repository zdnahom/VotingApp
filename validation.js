const joi=require('@hapi/joi');

//RegisterValidation
const registerValidation=(data)=>{
    // const ageSchema=joi.extend(require("joi-age"));
    const schema=joi.object({
        fullname:joi.string().min(6).required(),
        image:joi.string().required(),
        age:joi.number().min(19).max(100).required(),
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required(),
        region:joi.string().min(10).required()
});
return schema.validate(data);
};

//Login Validation
const loginValidation=(data)=>{
    const schema=joi.object({
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    });
    return schema.validate(data);
    }

module.exports.loginValidation=loginValidation;
module.exports.registerValidation=registerValidation;
