const express = require('express');
const app = express();
const bodyparser = require('body-parser')
app.set('view engine','ejs')
//const MongoClient = require('mongodb').MongoClient
//console.log("may node be with u");
//mongodb+srv://cluster0.txdvj.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority

//MongoClient.connect('mongo')

const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const credentials = __dirname +'/X509-cert-78289704781835578.pem'
connectionString = 'mongodb+srv://cluster0.txdvj.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority'
/*connection string with cerftificate
MongoClient.connect(connectionString,{
    sslKey: credentials,a
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })
  */
  MongoClient.connect(connectionString,{
    sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
}).then(client=>{
    console.log("connected to db")
    const db = client.db("starwars")
    const quotesCollections = db.collection('quotes')
    app.get('/',(req,res)=>{
        db.collection('quotes').find().toArray()
        .then(result =>{
            console.log(result);
        }).catch(error => console.error(error))
    })
    app.post('/quotes',(req,res)=>{
        quotesCollections.insertOne(req.body)
        .then(result =>{
            res.redirect('/')
            //console.log(result)
        }).catch(error=>console.error(error))
    })
}).catch (error => {
    console.error(error);
  })
/*const client = new MongoClient('mongodb+srv://cluster0.txdvj.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});
async function run() {
  try {
    await client.connect();
    const database = client.db("Cluster0");
    const collection = database.collection("Cluster0Col");
    const docCount = await collection.countDocuments({});
    console.log(docCount);
    // perform actions using client
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/
app.listen(3000,function(){
    console.log('listening on port 3000')
})
app.use(bodyparser.urlencoded({extended:true}))
/*

app.get('/',(req,res)=>{
    //res.send('hello world')
    res.sendFile(__dirname + '/index.html')
})
*/
/*app.post('/quotes',(req,res)=>{
    console.log(req.body);
})
*/