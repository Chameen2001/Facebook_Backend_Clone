
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const app = express();
app.use(express.json())

router.post('/',(req, res, next) => {
    // let user = new User({
    //     firstName: req.body.name.firstName,
    //     surName: req.body.name.surName,
    //     mobileNo: req.body.mobileNo,
    //     email: req.body.email,
    //     password: req.body.password,
    //     birthDay: req.body.birthDay.date + "-" + req.body.birthDay.month + "-" + req.body.birthDay.year,
    //     gender: req.body.gender
    // })

    //above user model assignation is redundance, we can use below method to assign our model instead of using above method

    let user = new User(req.body); // we assign the json values directly

    //************************************************ */


    //-----------------Save User By using promising method------------------------

    /****If We use this method(Promising) we do not need to require async and await (Don't forget to remove async in the http method)*/

    // user.save().then(result=>{
    //     res.send(result);
    // })
    // .catch(error=>{
    //     error.status=400;
    //     next(error);
    // })
    //*************************************************************** */

//    await user.save((err, data) => {
//         if (err) {
//             res.status(400).json({
//                 status: 400,
//                 message: err,
//                 data: null
//             })
//         } else {
//             res.status(200).json({
//                 data: null,
//                 status: 400,
//                 message: err,
//             });
//         }
//     });

})

router.get('/',async(req,res,next)=>{
    
})

module.exports = router;