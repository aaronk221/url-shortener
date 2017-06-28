var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema for global counter collection
var counterSchema = new Schema({

    _id: {type: String, required: true},
    seq: {type: Number, default: 0}

});

var counter = mongoose.model('counter', counterSchema);

//schema for URL collection
var urlSchema = new Schema({

    _id: {type: Number, index: true},
    long_url: String,
    created_at: Date

});

//Increment the global counter before updating the URL collection
urlSchema.pre('save', function(next){

    var doc = this;
    console.log("******DEBUG: " + this);

    counter.findByIdAndUpdate({ _id: 'url_count'}, { $inc: {seq: 1} }, function(err, counter){

        if(err) return next(err);

        doc._id = counter.seq;
        doc.created_at = new Date();
        next();

    });

});

var url = mongoose.model('url', urlSchema);

module.exports = url;
