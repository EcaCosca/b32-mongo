const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/posts.js');

const app = express()
const port = process.env.PORT || 8000

app.use(express.json());

// Let's connect and see what we get
// mongoose.connect('mongodb+srv://m001-student:pass1234@sandbox.apxur.mongodb.net/M001?retryWrites=true&w=majority')
// .then(res => console.log(res))
// .catch(err => console.log(err));

// Let's learn how to have a .env file in our backend
// mongoose.connect(process.env.MONGO_URI)
// .then(res => console.log(res))
// .catch(err => console.log(err));

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// READ 
app.get("/", (req, res) =>{
 Post
   .find({}, (err, data) => res.send(data))
})

// CREATE
app.post("/messages", (req, res) =>
 Post
   .create({ title: "Great article", author: "me", body: "lorem ipsum" })
   .then((newMessage) => {
     res.send(newMessage);
   })
);
   
// What happens if I try to send something that is not in the scheema?
// app.post("/messages", (req, res) =>
//  Post
//    .create({ title: "Great article", author: "me", body: "lorem ipsum", driver:"whatdoyouthink you are doing?" })
//    .then((newMessage) => {
//      res.send(newMessage);
//    })
// );

// SEND A PACKAGE OVER FROM INSOMNIA { title: "NAH", author: "Max", body: "Yeah" }
// app.post("/messages", (req, res) =>
//  Post
//    .create()
//    .then((newMessage) => {
//      res.send(newMessage);
//    })
// );


// UPDATE
app.put("/edit", (req, res) =>{
 Post
   .updateMany({title: "Old Title"}, { $set: { title: "New Title" } })
   .then((newPosts) => {
     res.send(newPosts);
   })
});

// DELETE
app.delete("/:id", (req, res) =>{
 Post
   .deleteOne({_id: req.params.id})
   .then(() => {
     res.end();
   })
});

app.use('*', (req,res)=>res.sendStatus(404));

app.listen(port, ()=>{console.log(`Server Running http://localhost:${port}/`)})
