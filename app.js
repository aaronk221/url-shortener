var mongodb = require('mongodb').MongoClient;
var express = require('express');
var http = require('http');

var port = process.env.PORT || 8080;

var app = express();

app.set('views', './views');

var url = 'mongodb://aaronk221:Ernieball1!@ds139362.mlab.com:39362/short-urls';


app.get('/', function(req, res){

    res.render('index');

});

app.post('/new/:url', function(req, res){


    console.log(req.query);

    mongodb.connect(url, function(err, db){

        if(err) console.log('Unable to connect to the server.');
        else console.log('Connection established to ' + url);

        var col = db.collection('urls');

        var shortUrl = {

            url: 'google.com',
            short: 'a4s'

        };

        try{

            col.update({ url: 'google.com' }, { $set: { _id: 'helloworld' } }, function(err, data){

                if(err){

                    console.log('could not update.\n' + err);

                }

            });

        }catch(e){

            console.log('error attempting push\n');
            console.log(e);

        }

        db.close();

    });

});

app.listen()
