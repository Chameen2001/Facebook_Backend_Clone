const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const app = express();
app.use(express.json());


router.post("/", async (req, res, next) => {
  //-------------------Gathering Data from request to our model--------------------

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

  /* === let user = new User(req.body); === // we assign the json values directly

    //************************************************ */

  // ----------------Save user by using async and await method------------

  //   try {
  //     const user = new User({
  //         firstName: req.body.name.firstName,
  //         surName: req.body.name.surName,
  //         mobileNo: req.body.mobileNo,
  //         email: req.body.email,
  //         password: req.body.password,
  //         birthDay:
  //           req.body.birthDay.date +
  //           "-" +
  //           req.body.birthDay.month +
  //           "-" +
  //           req.body.birthDay.year,
  //         gender: req.body.gender,
  //       });

  //     const result = await user.save();
  //     res.send(result);
  //   } catch (error) {
  //     next(error);
  //   }

  //-----------------Save User By using promising method------------------------

  /****If We use this method(Promising) we do not need to require async and await (Don't forget to remove async in the http method)*/

  // let user = new User({
  //     firstName: req.body.name.firstName,
  //     surName: req.body.name.surName,
  //     mobileNo: req.body.mobileNo,
  //     email: req.body.email,
  //     password: req.body.password,
  //     birthDay: req.body.birthDay.date + "-" + req.body.birthDay.month + "-" + req.body.birthDay.year,
  //     gender: req.body.gender
  // })

  // user.save().then(result=>{
  //     res.send(result);
  // })
  // .catch(error=>{
  //     error.status=400;
  //     next(error);
  // })
  //*************************************************************** */

  try {
    res.send(
      await new User({
        firstName: req.body.name.firstName,
        surName: req.body.name.surName,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        password: req.body.password,
        birthDay:
          req.body.birthDay.date +
          "-" +
          req.body.birthDay.month +
          "-" +
          req.body.birthDay.year,
        gender: req.body.gender,
      }).save()
    );
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    // res.send(await User.find({},{__v:0})); this is a way to avoiding fetching unwanted data;
    // res.send(await User.find({},{_id:0})); this is the way to get data without id
    //res.send(await User.find({},{_id:0,firstName:1}));  if we want only one property, we can use this
    // res.send(await User.find({firstName:"Chameen"},{})); This is the way to filter

    res.send(await User.find({}, { __v: 0,password:0 }));
  } catch (error) {
    next(error);
  }
});

router.get("/search/",async(req,res,next)=>{
  try {

    // res.send(await User.find({firstName:req.query.username},{}));

    const users = await User.find({},{firstName:1,surName:1,_id:1});
    const userAr = [];
    users.forEach((user)=>{
      if(req.query.firstName === user.firstName || req.query.surName === user.surName){
        userAr.push({
          _id:user._id,
          firstName:user.firstName,
          surName:user.surName
        })
      }
    });

    res.json(userAr);

  } catch (error) {
    next(error)
  }
});

router.delete('/:id',function(req,res,next){

  User.findById(req.params.id).remove().then(result=>{
    res.send(result);
  }).catch(error=>{
    next(error);
  });
});

router.put('/:id',(req,res,next)=>{
  User.findById(req.params.id).then(result=>{
    const pass = result.password;
    result.remove().then(result=>{
      const user = new User(req.body);
      user.password=pass;
      user._id=req.params.id;
      user.save().then(result=>{
        res.send({
          message:"successfully updated"
        })
      }).catch(error=>{
        next(error);
      })
    })
  }).catch(error=>{
    error.status=404;
    error.message=`There is not a user associate with this id (${req.params.id})`
    next(error);
  })
});

module.exports = router;
