const express = require('express');
const router = express.Router();
const app = express();
const User = require('../models/user.model');

app.use(express.json());

router.post('/',async(req,res,next)=>{
    const isValidPassword=false;
    try {
        const users = await User.find({email:req.body.email},{}); 
        if(users.length===0)res.send({
            message:"invalid username"
        });
        console.log(users);  
        users.forEach(element => {
            if(element.password==req.body.password){
                res.send({
                    message:"Successfully logged in"
                });
                isValidPassword=true;
            }
        });
        if(!isValidPassword)res.send({
            message:"invalid password"
        });
    } catch (error) {
        next(error)
    }

});

module.exports=router;