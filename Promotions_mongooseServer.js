var mongoose = require('mongoose');
var Promotions = require('./model/promotions');

var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection : Error"));

db.once('open', function(err){
   if(err) {
       throw err;
   } 

    console.log("connection successful");
    Promotions.create({
        name : "Weekend Grand Buffet",
        image : "images/buffet.png",
        label : "New",
        price : "$19.99",
        description : "Featuring..."
    }, function(err, promotion) {
        if(err) {
            throw err;
        }
        console.log("promotion created");
        console.log(promotion);
        var promoId = promotion._id;
        Promotions.findByIdAndUpdate(promoId, {
            $set : {
                description : "Updated Description. This is New Promo"
            }
        }, {
            new : true
        }).exec(function(err, promotion) {
            if(err) {
                throw err;
            }
            console.log("promotion updated");
            console.log(promotion);
            db.collection('promotions').drop(function(err){
                    if(err) {
                        throw err;
                    }
                    console.log("collection dropped");
                    db.close();
                    console.log("Connection also dropped");
                });
        });
    });
});