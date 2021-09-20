const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://fridge:LMqx3oGoEzytuvY3@cluster0.2yonp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'//change later, may need to use dotenv to hide

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useUnifiedTopology: true,
  dbName:'user'
})
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));

  const Schema = mongoose.Schema;
  
  const usersSchema = new Schema({
    username: {
      type: String, required: true, unique: true
    },
    wasted: [
      {
        name: String,
        quantity: String,
        price: Number,
        datePurchased: String,
        useByDate: String
      }
  ],
    tasted: [
      {
        name: String,
        quantity: String,
        price: Number,
        datePurchased: String,
        useByDate: String
      }
    ],
    fridge: [
      {
        name: String,
        quantity: String,
        price: Number,
        datePurchased: String,
        useByDate: String
      }
    ]
  })

  const Users = mongoose.model('users', usersSchema);

  module.exports = Users;