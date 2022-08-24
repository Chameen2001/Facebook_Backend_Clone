const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 4000;
const userRoute = require('./routes/user.routes');

// -----------Introducing Content Type to the Express------------------

app.use(express.json())
app.use(express.urlencoded({extended:true}));

/*****************************************************************/





//------------------Connection to database---------------------------

const dbUrl = 'mongodb+srv://cluster0.189atqv.mongodb.net/';
const connectionParams = {
    dbName:'facebook_clone_db',
    user:'root',
    pass:'dilhara2001',
    useNewUrlParser:true,
    useUnifiedTopology:true
}

mongoose.connect(dbUrl,connectionParams)
.then(()=>{
  console.log("database connected");
})
.catch(()=>{
  console.log("connecting database is unsuccessful");
})

/*****************************************************************/







//-----------------Port Listening---------------------------------------

app.listen(PORT,()=>{
    console.log(`Listening : ${PORT}`);
});

/**************************************************************** */








//--------------Routeing-------------------------------------------------

app.use('/user',userRoute);

/**************************************************************** */






//------------------------------Error Handling------------------------

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status=404;
    next(err);
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    });
})

/**************************************************************** */
