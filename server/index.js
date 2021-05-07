const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');

// Mongo Db connection
const mongoose = require('mongoose');
const config = require('./config/config');

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('MongoDB has connected succesfully');
})
mongoose.connection.on('reconnected', () => {
    console.log('MongoDB has reconnected');
})
mongoose.connection.on('error', error => {
    console.log('MongoDB connection has an error', error);
    mongoose.disconnect();
})
mongoose.connection.on('disconnected', () => {
    console.log('Mongo connection is disconnected');
})


// Routes for routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const chatRoomRouter = require('./routes/chatRoom');
const deleteRouter = require('./routes/delete');

// creating express app
const app = express();
const port = process.env.PORT || "3000";

// Middle wares in sequence
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended : false}));


// Routers in sequence
app.use('/',indexRouter);
app.use('/users', userRouter);
app.use('/room', chatRoomRouter);
app.use('/delete', deleteRouter);


// Last middleware to catch all the errors
app.use('*', function(err, req, res, next){
    return res.status(404).json({
        success : false,
        message : err.message
    });
});



// Create http server and start listening
const server = http.createServer(app);
server.listen(port);
server.on("listening", () =>{
    console.log(`Listening on port:: http://localhost:${port}/`);
})