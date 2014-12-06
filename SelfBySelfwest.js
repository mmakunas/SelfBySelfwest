// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

TopTweets = new Mongo.Collection("toptweets");

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    players: function () {
      return TopTweets.find({}, { sort: { score: -1, name: 1 } });
    },
    selectedName: function () {
      var player = TopTweets.findOne(Session.get("selectedPlayer"));
      return player && player.name;
    }
  });

  Template.leaderboard.events({
    'click .inc': function () {
      TopTweets.update(Session.get("selectedPlayer"), {$inc: {score: 5}});
    }
  });

  Template.player.helpers({
    selected: function () {
      return Session.equals("selectedPlayer", this._id) ? "selected" : '';
    }
  });

  Template.player.events({
    'click': function () {
      Session.set("selectedPlayer", this._id);
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {

}
