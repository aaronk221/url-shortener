//var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var express = require('express');
var bp = require('body-parser');
var config = require('./config');
var shortener = require('./shortener');
var urlModel = require('./models/urlModel');
var app = express();

//heroku port
var port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI);

//parse incoming request body as json
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

//set directory for serving html
app.use('/', express.static(__dirname + '/html'));

//render homepage
app.get('/', function(req, res){

    res.render('index.html');

});

//handle POST requests for adding new URLs to our database
app.post('/new/url', function(req, res){

    var url = req.body.url;
    var shortUrl = '';

    urlModel.findOne({'long_url': url}, function(doc){

        if(doc){

            shortUrl = config.webhost + shortener.encode(doc._id);
            res.send({'shortUrl': shortUrl});

        }
        else{

            var entry = urlModel({'long_url': url});

            entry.save(function(err){

                if(err) console.log(err);

                shortUrl = config.webhost + shortener.encode(entry._id);
                res.send({'shortUrl': shortUrl});

            });

        }

    });

});

//redirect user to the desired website if the provided shortened URL
//if it exists in our database, otherwise direct to homepage
app.get('/:shortUrl', function(req, res){

    var shortUrl = req.params.shortUrl;
    var id = shortener.decode(shortUrl);

    urlModel.findOne({_id: id}, function(err, doc){

        if(doc){

            res.redirect(doc.long_url);

        }
        else
            res.redirect(config.webhost);

    });

});

app.listen(port);
