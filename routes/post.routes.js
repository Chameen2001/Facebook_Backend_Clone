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

module.exports = router;