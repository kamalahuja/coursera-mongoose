var mongoose = require('mongoose');
var Dishes = require('./model/dishes');

var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection : Error"));

db.once('open', function(err){
    if(err) {
        throw err;
    }
    
    Dishes.create({
        name: "Uthapizza",
        description: "This is Delicious",
        image : "images/Uthapizza.png",
        category : "mains",
        price : "$4512.23",
        comments:[{
            rating: 5,
            comment: "this is delicious",
            author: "Kamal Ahuja"
        }]
    }, function(err, dish){
        if(err) {
            console.log(err);
            throw err;
        }
        console.log("Dish Created");
        console.log(dish);
        var id = dish._id;
        Dishes.findByIdAndUpdate(id, {
            $set : {
                description : "Updated Description. This si delicisui again"
            }
        }, {
            new : true
        }).exec(function(err, dish) {
            if(err) {
                throw err;
            }
            console.log("Dish Updated");
            console.log(dish);
            dish.comments.push({
                rating: 3,
                comment : "New Comment",
                author : "Test User"
            });
            
            dish.save(function(err, dish){
                if(err) {
                    throw err;
                }
                console.log("dish commment updated");
                console.log(dish);
                db.collection('dishes').drop(function(err){
                    if(err) {
                        throw err;
                    }
                    console.log("collection dropped");
                    db.close();
                    console.log("Connection also dropped");
                });
                
            });
        })
    });
});
