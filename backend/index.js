const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
const { Socket } = require('socket.io');

connectToMongo();
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())

app.use(express.json());

app.use('/api/auth',require('./routes/auth'))

app.use('/api/notes',require('./routes/notes'))

app.use('/api/user',require('./routes/user'))

app.use('/api/requests',require('./routes/requests'))

app.use('/api/friends',require('./routes/friends'))

app.use('/api/chats',require('./routes/chats'))

app.use('/api/messages',require('./routes/messages'))




app.get('/' ,(req , res) => {
  res.send("hii i am ")
 })

 app.get('/home' ,(req , res) => {
  res.send("I am home ")
 })

 const server= app.listen(port,()=>{
    console.log("server is running at port " + port)
  })


  const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    } ,
  });

  io.on("connection", (socket) =>{

    socket.on('setup', (userData) =>{
      socket.join(userData);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  

  })