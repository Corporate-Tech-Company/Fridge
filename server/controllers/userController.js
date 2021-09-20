const User = require('../models/userModel');
//empty obj to store middlewares
const userController = {};

userController.getItems = (req, res, next) => {
	//req.body will only have username, so just put it in as an parameter
	User.findOne(req.query)
		.then((users) => {
			if(!users) return res.status(404).send('No user with this username exists.')
			res.locals.users = users;
			next();
		})
		.catch((err) => next(err));
};

//**i think this format could be used for all of backend request to database? Discuss with team**//
userController.editItems = (req, res, next) => {
	//save it to an obj variable to use it as a search
	const username = { username: req.body.username };
	//find one and update;
	/*assuming 
  
  ex1: to add item in fridge, or delete item from fridge, wasted, tasted
  req.body = {
    username: 'username',
    fridge/tasted/wasted: [ new edited array (added or deleted)]
  }

  ex2: to move from fridge to either wasted or tasted
  req.body = {
    username: 'username',
    fridge: [newArray (deleted)],
    tasted/wasted:[newArray (added)],
  }
  */

	User.findOneAndUpdate(username, { $set: req.body }, { new: true })
		.then((users) => {
			if(!users) return res.status(404).send('No user with this username exists.')
			res.locals.newUserData = users;
			next();
		})
		.catch((err) => next(err));
};

userController.addUser = (req, res, next) => {
	User.create(req.body)
		.then((users) => {
			res.locals.users = users;
			next();
		})
		.catch((err) => next(err));
};

module.exports = userController;
