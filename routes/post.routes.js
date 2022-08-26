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
    const found=false;
    try {
        const allPosts = await Post.find({userId:req.params.id},{});
        let post;
        allPosts.forEach(element => {
            if(element._id==req.query.postId){
                found=true;
                post=element;
                res.send(post);
                return;
            }
        });
        if(!found){
            next(new Error("Can not find a post related this id"))
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',async(req,res,next)=>{
    let found=false;
    try {
        const allPosts = await Post.find({userId:req.params.id},{});
        let post;
        allPosts.forEach(async element => {
            if(element._id==req.query.postId){
                found=true;
                element.remove();
                res.send({
                    message:"Successfully removed"
                })
            }
        });
        if(!found){
            next(new Error("Can not find a post related this id"))
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id',async (req,res,next)=>{
    let found=false;
    try {
        const allPosts = await Post.find({userId:req.params.id},{});
        const _id=req.body._id;
        allPosts.forEach(async element => {
            if(element._id==req.body._id){
                found=true;
                element.remove();
                const post = new Post(req.body);
                post._id=_id;
                post.save();
                res.send({
                    message:"Successfully updated"
                });
                return;
            }
        });
        if(!found){
            next(new Error("Can not find a post related this id"))
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;