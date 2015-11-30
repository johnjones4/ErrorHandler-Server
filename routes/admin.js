var mongoose = require('mongoose');
var Issue = mongoose.model('Issue');

exports.table = function(req,res,next) {
  Issue
    .find()
    .sort({'created': -1})
    .exec(function(err,docs) {
      if (err) {
        next(err);
      } else {
        res.render('table',{
          'headers': [
            'Type',
            'Created',
            'IP',
            'App',
            ''
          ],
          'rows': docs.map(function(issue) {
            return [
              issue.type,
              issue.created,
              issue.ip,
              issue.appInfo.CFBundleIdentifier,
              '<a href="/issue/' + issue._id + '" class="btn btn-default btn-xs">Detail</a>'
            ];
          })
        })
      }
    });
}

exports.detail = function(req,res,next) {
  Issue.findById(req.params.id,function(err,issue) {
    if (err) {
      next(err);
    } else {
      res.render('detail',{
        'detail': JSON.stringify(issue,null,2)
      });
    }
  });
}