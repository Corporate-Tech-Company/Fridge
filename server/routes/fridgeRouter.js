const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/',
  userController.editItems,
  (req, res) => res.status(200).json(/*whatever data the front end needs*/)
);

router.delete('/',
  userController.deleteItem,
  (req, res) => res.status(200).json(/*whatever data the front end needs*/)
);



module.exports = router;