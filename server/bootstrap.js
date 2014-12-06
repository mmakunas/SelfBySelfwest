/**
 * Created by makunasm on 12/5/14.
 */

Meteor.startup(function () {

    Twit = new TwitMaker({
        consumer_key: 'aG6lZyEqVTkEnDSAAwpBSCjOJ'
        , consumer_secret: 'xi5m3CaJREFPtP2dHjrQSY9eZEXsxOSfv4ryt7EhiXKBcKAF0l'
        , access_token: '2919941173-SBq4nYhXMaNgX6vdrjELazrV6W6aPXSCmwEkdex'
        , access_token_secret: 'ani3mypWASbnrpDM6yaCZTJno7DXtAphL148hoXs6JPrG'
    });

    Twit.getSync = Meteor.wrapAsync(Twit.get.bind(Twit));
    var topTweets = new Object();

    var saveTopTweet = function (id, tweet) {
        TopTweets.update(id,
        {"$set":{"name":tweet.user.screen_name}}, {upsert: true});
        TopTweets.update({_id: id}, { "$inc" : { "score" : Math.floor(Random.fraction() * 10) * Math.floor(Random.fraction() * 10) } });

    }


    var names = ["540974974430105601", "540905471029567489", "540893751108177920"];

    Meteor.setInterval(function (name) {
        console.log("updating top tweets")
        _.each(names, function (name) {

            //var theTweet;
            /*
             Twit.get('statuses/show/:id', { id: name }, function (err, data, response) {
             theTweet = data;
             saveTopTweet(name, theTweet)
             topTweet[name] = data;
             })
             */
            var tweet = Twit.getSync('statuses/show/:id', {id: name})
            //var oembed = Twit.getSync('statuses/oembed.json?:id', {id: name})

            saveTopTweet(name, tweet)


        });
    }, 15000)

   // Twit.get('statuses/oembed.json?:id', { id: 540974974430105601 }, function (err, data, response) {
   //     console.log(data);
   //     console.log(err);
   // })



});