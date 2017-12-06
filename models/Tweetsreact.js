var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    twid       : String
  , active     : Boolean
  , author     : String
  , avatar     : String
  , body       : String
  , date       : Date
  , screenname : String
});


schema.statics.getTweets = function(page, skip, callback) {

  var tweets = [],
      start = (page * 30) + (skip * 1);


  Tweetsreact.find({},'twid active author avatar body date screenname',{skip: start, limit: 30}).sort({date: 'desc'}).exec(function(err,docs)
  {


    if(!err)
    {
      tweets = docs;
      tweets.forEach(function(tweet)
      {
        tweet.active = true;
      });
    }


    callback(tweets);

  });

};


module.exports = Tweetsreact = mongoose.model('Tweetsreact', schema);