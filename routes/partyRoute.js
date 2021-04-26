const router=require('express').Router();
const Party=require('../models/party');

// retrieve or get a post
router.get('/', async (req, res) => {
    try {
        const parties = await Party.find();
        res.json(parties);
    } catch (err) { res.json({ message: err }) };
});


// Submit a post
function getNextSequence(db, name, callback) {
    db.collection("counters").findAndModify( { _id: name }, null, { $inc: { seq: 1 } }, function(err, result){
        if(err) callback(err, result);
        callback(err, result.value.seq);
    } );
};
router.post('/', async (req, res) => {
    const post = new Party({
        name: req.body.name,
        leader: req.body.leader,
        region: req.body.region,
        vote:req.body.vote,
        description: req.body.description,
        hpr: req.body.hpr,
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) { res.json({ message: err }) };

});

//Specific post by id

router.get('/:postId', async (req, res) => {
    try {
        const post = await Party.findById(req.params.postId);
        res.json(post);
    } catch (err) { res.json({ message: err }) };
});

router.put('/:postId',async (req,res)=>{
    try {
      
        const updatedPost=await Party.updateOne({_id:req.params.postId},{$set:{
            name: req.body.name, 
            leader: req.body.leader,
            region: req.body.region,
            vote:req.body.vote,
            description: req.body.description,
            hpr: req.body.hpr}});
        res.json(updatedPost);
    } catch (err) { res.json({ message: err }) }
});

router.delete('/:postId',async (req,res)=>{
    try {
        const deletedPost = await Party.remove({_id:req.params.postId});
        res.json(deletedPost);
    } catch (err) { res.json({ message: err }) };
});
module.exports=router