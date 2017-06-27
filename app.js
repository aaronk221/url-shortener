var mongodb = require('mongodb').MongoClient;
var express = require('express');
var http = require('http');

var port = process.env.PORT || 8080;
var dbUrl = 'mongodb://aaronk221:Ernieball1!@ds139362.mlab.com:39362/short-urls';


var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res){

    res.render('index');

});

app.get('/new/:url', function(req, res){

    var url = req.params.url;

    mongodb.connect(dbUrl, function(err, db){

        if(err) console.log('Unable to connect to the server.');
        else console.log('Connection established');

        var col = db.collection('urls');

        var shortUrl = {

            'url': url,
            short: 'short'

        };

        try{

            col.insert(shortUrl);
            console.log('short created');

        }catch(e){

            console.log('error attempting push\n');
            console.log(e);

        }

        db.close();

    });

    res.render('index');

});

app.get('/:url', function(req, res){

    var short = req.params.url;

    mongodb.connect(dbUrl, function(err, db){

        if(err) console.log('Unable to connect to the server.');
        else console.log('Connection established');

        var col = db.collection('urls');

        try{

            col.find({

                'short': short

            }).toArray(function(err, doc){

                if(err) console.log("something went wrong\n" + err);
                else {
                    res.send(doc.url);
                }

            });

            console.log('successfully redirected');

        }catch(e){

            console.log('error attempting push\n');
            console.log(e);

        }

        db.close();

    });

});

app.listen(port);
