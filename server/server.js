const express = require('express');
const app = express();
const path = require('path');
const wastedRouter = require('./routes/wastedRouter');
const tastedRouter = require('./routes/tastedRouter');
const fridgeRouter = require('./routes/fridgeRouter');
const userController = require('./controllers/userController');

//to parse the incoming requests with JSON
app.use(express.json());

//to serve static file while in /dist
app.use('/dist', express.static(path.join(__dirname, '../dist')));

//to server html as the home page
app.get('/', (req,res)=>{ 
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

//render html when the website is refreshed in the wasted react route
app.get('/wasted', (req,res)=> {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

//render html when the website is refreshed in the tasted react route
app.get('/tasted', (req,res)=> {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

//render html when the website is refreshed in the fridge react route
app.get('/fridge', (req,res)=> {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

//initally, get users info using a query string after /user
app.get('/user',
  userController.getItems,
  (req, res) => res.status(200).json(res.locals.users)
);

//post to add user
app.post('/addUser',
  userController.addUser,
  (req,res) => res.status(200).json(res.locals.users)
);

//routing to corresponding API to add/edit/delete items from array(s)
app.use('/api/wasted', wastedRouter);
app.use('/api/tasted', tastedRouter);
app.use('/api/fridge', fridgeRouter);

//send all other end point to 404 not found
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next)=>{
  const defaultErr = 
  {
    log: 'unknown middleware error',
    status: 400,
    message: {err: 'error occurred'}
  };
  const errorObj = {
    ...defaultErr,
    log: err.name + ' ' + err.message,
    message: {err: err.message}
  };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, ()=> console.log("SERVER SERVED AT PORT 3000"));