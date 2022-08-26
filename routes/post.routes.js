const express = require('express');
const router = express.Router();
const app = express();
const Post = require('../models/post.model')
app.use(express.json());

router.post("/:id",async(req,res,next)=>{
    try {
        const post = new Post(req.body);
        post.userId=req.params.id;
        await post.save();
        res.send({
            message:"Post Added Successfully"
        })
    } catch (error) {
        next(error);
    }
})

router.get("/:id",async(req,res,next)=>{
    try {
        res.send(await Post.find({userId:req.params.id},{}));
    } catch (error) {
        next(error)
    }
});

router.get('/01_post/:id',async(req,res,next)=>{
    try {
        const allPosts = await Post.find({userId:req.params.id},{});
        let post;
        allPosts.forEach(element => {
            if(element._id==req.query.postId){
                post=element;
            }
        });
        res.send(post);
    } catch (error) {
        next(error);
    }
});


module.exports = router;