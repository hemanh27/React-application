var JSX = require('node-jsx').install(),
    React = require('react'),
    TweetsApp = React.createFactory(require('./components/TweetsApp.react')),
    Tweetsreact = require('./models/Tweetsreact'),
    Tweetsnode = require('./models/Tweetsnode'),
    Tweet = require('./models/Tweet');

module.exports = {

  index: function(req, res) {
    // Call static model method to get tweets in the db
    Tweet.getTweets(0,0, function(tweets, pages) {

      // Render React to a string, passing in our fetched tweets
      var markup = React.renderToString(
        TweetsApp({
          tweets: tweets,
          form: true
        })
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
  },

  react: function(req, res) {
    // Fetch tweets by page via param
    Tweetsreact.getTweets(0,0, function(tweets, pages) {

      // Render React to a string, passing in our fetched tweets
      var markup = React.renderToString(
          TweetsApp({
            tweets: tweets,
            form: false
          })
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
  },

  node: function(req, res) {
    // Fetch tweets by page via param
    Tweetsnode.getTweets(0,0, function(tweets, pages) {

      // Render React to a string, passing in our fetched tweets
      var markup = React.renderToString(
          TweetsApp({
            tweets: tweets,
            form: false
          })
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
  }

}
