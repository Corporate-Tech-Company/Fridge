const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://fridge:LMqx3oGoEzytuvY3@cluster0.2yonp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'//change later, may need to use dotenv to hide

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useUnifiedTopology: true,
  dbName:'user'
})
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));

  // const credential = {
  //   username:'fridge',
  //   password:'LMqx3oGoEzytuvY3'
  // }
  const Schema = mongoose.Schema;

  const usersSchema = new Schema({
    username: {
      type: String, required: true, unique:true
    },
    nickname: String,
    wasted: {
      type:Array, required: true
    },
    tasted: {
      type:Array, required: true
    },
    fridge: {
      type:Array, required: true
    },
  })
  
  const Users = mongoose.model('users', usersSchema);

  module.exports = Users;