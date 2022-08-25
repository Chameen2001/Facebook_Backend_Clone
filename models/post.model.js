const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const postScheme = new Scheme({
    userId:{
        type:String,
        required:true
    },
    postBody:{
        type:String
    },
    imageUrl:{
        type:String
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    privacy:{
        type:String,
        required:true
    }

});

const post = mongoose.model('post',postScheme);
module.exports = post;