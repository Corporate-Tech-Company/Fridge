const { WSAETIMEDOUT } = require('constants');
const User = require('../models/userModel');
//empty obj to store middlewares
const userController = {};

userController.getItems = (req, res, next) => {
  console.log(req.body)
  //req.body will only have username, so just put it in as an parameter
  User.findOne(req.body)
    .then(users => {
      res.locals.users = users;
      next();
    })
    .catch(err => next(err));
};

userController.deleteItem = (req, res, next) => {

}

userController.editItems = (req, res, next) => {
  
  // const username = {username: req.body.username};
  // const editItems = {}
  // User.findOneAndUpdate(username, {$set: req.body}, {new:true})
}

userController.addUser = (req, res, next) => {
  console.log(req.body)
  User.create(req.body)
  .then(users => {
    res.locals.users = users;
    console.log(users)
    next();
  })
  .catch(err => next(err));
}


module.exports = userController;