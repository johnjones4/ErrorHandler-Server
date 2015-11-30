var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  'type': String,
  'data': {
    'code': Number,
    'domain': String,
    'name': String,
    'reason': String
  },
  'userInfo': mongoose.Schema.Types.Mixed,
  'callStack': [String],
  'deviceInfo': {
    'name': String,
    'systemName': String,
    'systemVersion': String,
    'model': String,
    'localizedModel': String,
    'identifierForVendor': String
  },
  'appInfo': {
    'CFBundleIdentifier': String,
    'CFBundleShortVersionString': String,
    'CFBundleVersion': String
  },
  'ip': String,
  'created': {
    'type': Date,
    'default': Date.now
  }
});

mongoose.model('Issue',schema);
