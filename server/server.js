const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req,res)=>{
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
})

app.get('/wasted', (req,res)=>{
  console.log('u got wasted')
  return res.json({wasted: 'son of a gun'})
})

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