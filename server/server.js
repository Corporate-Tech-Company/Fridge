const express = require('express');
const app = express();
const path = require('path');
const wastedRouter = require('./routes/wastedRouter');
const tastedRouter = require('./routes/tastedRouter');
const fridgeRouter = require('./routes/fridgeRouter');
const userController = require('./controllers/userController');

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req,res)=>{
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/get',
  userController.getItems,
  (req, res) => res.status(200).json(res.locals.users)
);

// app.post('/post',
//   userController.addUser,
//   (req,res) => res.status(200).json(res.locals.users)
// );

app.use('/wasted', wastedRouter);

app.use('/tasted', tastedRouter);

app.use('/fridge', fridgeRouter);

app.use('*', (req, res) => res.sendStatus(404));

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