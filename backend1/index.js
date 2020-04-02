const express = require('express');
const app = express();
const http = require('http').createServer(app);
const RSA = require('hybrid-crypto-js').RSA;
const Crypt = require('hybrid-crypto-js').Crypt;
var io = require('socket.io').listen(http);
const bcrypt = require("bcrypt");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var rsa = new RSA({ keySize: 4096 });
var crypt =new Crypt({md:'sha256'});

const saltRounds = 10;
const PORT = 3000;

io.on('connection', (socket) => {
     
    console.log('A new user login');
    socket.on("ReqServerKey", () => { 
        rsa.generateKeyPairAsync().then(keys => {
            privateKey = keys.privateKey;
            publicKey = keys.publicKey;
        
            io.emit("ServerPublic",publicKey);
            console.log("Req");

            socket.on("Credentials", (data) => {
                console.log(data);
                var username = data.name;
                var password  = crypt.decrypt(keys.privateKey, data.pword).message;
                
                // bcrypt.hash(password, saltRounds,async  (err, hash)=>{

                    alert("User loggged in");
                    var obj = {name:username, password:password};

                    MongoClient.connect(url, (err,db)=>{
                        if(err)
                            throw err;
                       
                        var mydb = db.db("mydb");
                        mydb.createCollection("Credentials",(err,res)=>{
                            if(err)
                                throw err;
                        });
                        mydb.collection("Credentials").insertOne(obj, ()=>{
                            if(err)
                                throw err;
                            console.log("1 document inserted");
                        })
                        db.close();
                    })
                // })
            });
        })
    })
});

http.listen(PORT,()=>{
    console.log("Listening on port:3000");
})