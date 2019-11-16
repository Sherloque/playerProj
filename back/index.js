var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const express_graphql = require('express-graphql');
const fetch = require('node-fetch');
const { buildSchema } = require('graphql');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/project', { useNewUrlParser: true });


var db = mongoose.connection;

var userSchema = new mongoose.Schema({
  login: String,
  password: String,
  firstname: String,
  lastname: String

});

var User = mongoose.model('User', userSchema)


const config = {
  secret: `akfr-vfybfr`
}

function jwtWare() {
  const { secret } = config;
  return expressJwt({ secret }).unless({
      path: [
          '/login',
          '/',
          '/signup',
      ]
  });
}

function errorHandler(err, req, res, next) {
  if (typeof (err) === 'string') {
      // custom application error
      return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}



async function authenticate({ login, password }) {
  console.log(login, password)
  const user = users.find(u => u.login === login && u.password === password);
  if (user) {
      const token = jwt.sign({ sub: user.id }, config.secret);
      const { password, ...userWithoutPassword } = user;
      return {
          ...userWithoutPassword,
          token
      };
  }
}


function jwtCheck(req, secret) {
  const authorization = req && req.headers && req.headers.authorization 

  if (authorization && authorization.startsWith('Bearer ')){
      const token = authorization.substr("Bearer ".length)
      const decoded = jwt.verify(token, config.secret)
      return decoded
  }
}

var app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(jwtWare());



// global error handler
app.get('/', (req, res, next) => {
  res.json({all: 'ok'})
  //next()
});
app.use(errorHandler);


db.on('error', console.error.bind(console, 'connection error:'));

app.post('/signup', async (req, res) => {
  let newUser = new User(req.body)
  await newUser.save()
  res.status(201).send(newUser)
  console.log(newUser)
})


app.post('/login', async (req, res) => {
  user = await User.findOne(req.body)
  if(user) {
    let {password, ...userInfo} = user.toObject()
    const token = jwt.sign({sub: userInfo}, config.secret)
    res.status(201).json({token,userInfo})
    console.log(userInfo,token)
  }
  else{
    res.status(404)
  }
})

app.get('/hotchart', (req, res) => {	
  fetch(`http://theaudiodb.com/api/v1/json/1/mostloved.php?format=track`)
  .then(data => data.json())
  .then(data => {
    res.send(data); 
    console.log(data) 
  })
})



app.get('/jwt', (req, res) => {
  console.log('JWT ', jwtCheck(req, config.secret))
  const token = jwt.sign({ sub: "mylogin" }, config.secret)
  res.json({token})
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
