var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');
var config = require('../config.json');

exports.log = function(req,res,next) {
  if (req.body.apiKey == config.apiKey) {
    var issue = new Issue(req.body);
    issue.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    issue.save(function(err) {
      if (err) {
        next(err);
      } else {
        res.send({});
      }
    })
  } else {
    res.sendStatus(401);
  }
}