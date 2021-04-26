const router=require('express').Router();
const User=require('../models/user')
const{registerValidation,loginValidation}=require('../validation')
const bcrypt=require('bcryptjs');


router.post('/register',async (req,res)=>{
  
    //Validation
    const{error}=registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //check if email exists
    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hashing a password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);
  
    //Create a new user
    const user=new User({
        fullname:req.body.fullname,
        image:req.body.image,
        age:req.body.age,
        password:hashedPassword,
        email:req.body.email,
        region:req.body.region
    });
    try { 
        const savedUser= await user.save();
        res.send({user:user._id});
    } catch (error) {
        res.status(400).send(err);
    }
});
router.delete('/register/:postId',async (req,res)=>{
    try {
        const deletedPost = await User.remove({_id:req.params.postId})
        res.json(deletedPost);
    } catch (err) { res.json({ message: err }) };
});

router.get('/register', async (req, res) => {
    try {
        const posts = await User.find();
        res.json(posts);
    } catch (err) { res.json({ message: err }) };
});

// For Login

router.post('/login',async (req,res)=>{
    const{error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid Email');
    const passVal=await bcrypt.compare(req.body.password,user.password);
    if(!passVal) return res.status(400).send('Invalid Password');
    res.send('Login is Successfull');
});



module.exports=router;