const express = require('express');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');

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
    console.log('Listening on port:: http://localhost:${port}/');
})