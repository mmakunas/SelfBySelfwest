/**
 * Created by makunasm on 12/5/14.
 */

Meteor.startup(function () {

    Twit = new TwitMaker({
        consumer_key: 'aG6lZyEqVTkEnDSAAwpBSCjOJ'
        , consumer_secret: 'xi5m3CaJREFPtP2dHjrQSY9eZEXsxOSfv4ryt7EhiXKBcKAF0l'
        , access_token: '2919941173-CYHC23YrJ0CKC9Dr7vG3AjmICC1xQYYjC9XVs2N'
        , access_token_secret: 'Bu4e9pboaLn7k89ZwGiRFYz6lFFKEsiuGSHPWGTMcE1m2'
    });

    Twit.getSync = Meteor.wrapAsync(Twit.get.bind(Twit));
    var topTweets = new Object();

    var saveTopTweet = function (id, tweet) {
        TopTweets.update(id,
        {"$set":{"name":tweet.user.name}}, {upsert: true});

        console.log("incrementing...: " + id);
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

            saveTopTweet(name, tweet)


        });
    }, 15000)



});