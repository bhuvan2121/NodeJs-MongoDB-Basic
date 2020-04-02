const express = require('express');
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io').listen(http);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

const PORT = 8000;

io.on('connection', (socket) => {
     
    console.log('A new user operation');

        socket.on("Create", (data) => {
            console.log("Record to be created");
            
            var event = data.Event;
            var location = data.Location;
           
            console.log(event);
            console.log(location);

            var time = Date.now();
            var obj = {Event:event, Location:location, Time:time};

            MongoClient.connect(url, (err,db)=>{
                if(err)
                    throw err;
                
                var mydb = db.db("mydb");
                mydb.createCollection("Event Database",(err,res)=>{
                    // console.log("Collection Created!");
                });
                mydb.collection("Event Database").insertOne(obj, ()=>{
                    if(err)
                        throw err;
                    console.log(obj);
                    console.log("1 document inserted");
                })
                db.close();
            })
        });

        socket.on("Delete",(data)=>{
            console.log("Record to be Deleted")
            var event = data.Event;
            var location = data.Location;

            var obj;
            if(event==''||event==null)
                obj = {Location: location};
            else if(location==''||location==null)
                obj = {Event: event};
            else
                var obj = {Event:event, Location:location};

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                dbo.collection("Event Database").deleteMany(obj, function(err, obj) {
                  if (err) throw err;
                  db.close();
                });
            }); 
        });

        socket.on("Update",(data)=>{
            console.log("Record to be updated");
            var event = data.Event;
            var location = data.Location;
            var eve = data.Eve;
            var loc = data.Loc;

            console.log(event);
            console.log(location);
            console.log(eve);
            console.log(loc);

            var obj={};
            if(event==''||event==null)
                obj = {Location: loc};
            else if(location==''||location==null)
                obj = {Event: eve};
            else
                var obj = {Event:eve, Location:loc};
            
            var newobj={};
            if(event==''||event==null)
                newobj = {Location: location};
            else if(location==''||location==null)
                newobj = {Event: event};
            else
                newobj = {Event:event, Location:location};

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                dbo.collection("Event Database").updateMany(obj, {$set: newobj}, function(err, obj) {
                    if (err) throw err;
                    db.close();
                });
            }); 

        });
});
 
http.listen(PORT,()=>{
    console.log(`Listening on port:${PORT}`);
})