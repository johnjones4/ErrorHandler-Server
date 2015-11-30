var config = require('./config.json');
var models = require('./models');
var express = require('express');
var routes = require('./routes');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var auth = require('http-auth');

mongoose.connect(config.mongo.connection_string);

var app = express();
app.use(logger('combined'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

var authorize = auth.connect(auth.basic(
  {
    'realm': 'Admin'
  },
  function (username, password, callback) {
    callback(username === config.auth.username && password === config.auth.username);
  }
));

app.post('/log', routes.api.log);
app.get('/', authorize, routes.admin.table);
app.get('/issue/:id', authorize, routes.admin.detail);

app.listen(config.express.port,function() {
  console.log('Server running.');
});
