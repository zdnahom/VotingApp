const router=require('express').Router();
const Election=require('../models/election');

// retrieve or get a post
router.get('/', async (req, res) => {
    try {
        const election = await Election.find();
        res.json(election);
    } catch (err) { res.json({ message: err }) };
});


// Submit a post

router.post('/', async (req, res) => {
    const post = new Election({
        leader:req.body.leader,
        year: req.body.year,
        country: req.body.country,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) { res.json({ message: err }) };

});

//Specific post by id

router.get('/:postId', async (req, res) => {
    try {
        const post = await Election.findById(req.params.postId);
        res.json(post);
    } catch (err) { res.json({ message: err }) };
});

router.put('/:postId',async (req,res)=>{
    try {
      
        const updatedPost=await Election.updateOne({_id:req.params.postId},{$set:{
            leader:req.body.leader,
            year: req.body.year,
            country: req.body.country,
            description: req.body.description}});
        res.json(updatedPost);
    } catch (err) { res.json({ message: err }) }
});

router.delete('/:postId',async (req,res)=>{
    try {
        const deletedPost = await Election.remove({_id:req.params.postId});
        res.json(deletedPost);
    } catch (err) { res.json({ message: err }) };
});
module.exports=router