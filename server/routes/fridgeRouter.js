const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/',
  userController.editItems,
  (req, res) => res.status(200).json(res.locals.newUserData)
);

router.put('/',
  userController.editItems,
  (req, res) => res.status(200).json(res.locals.newUserData)
);

router.delete('/',
  userController.editItems,
  (req, res) => res.status(200).json(res.locals.newUserData)
);



module.exports = router;