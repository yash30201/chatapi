---
tags: [chatapi]
title: General Notes
created: '2021-05-03T13:18:18.144Z'
modified: '2021-05-06T06:02:39.660Z'
---

# General Notes
+ Create directory, initiate npm, install necessary modules - 
  + (later) express, mongoose, uuid, jsonwebtoken, morgan, socket.io, @withvoid/make-validation
+ In package.json file of node, there's an argument **script**. It allows us to write and access CLI code with just npn run scriptname, for eg,
  + to run `nodemon server/index.js`, we just do `npm run start`, simply insert the key of that command. 
```
"scripts": {
	"start": "nodemon server/index.js",
	"start:server": "node server/index.js"

  //ingeneral
  "start": "node index.js",
  "dev": "nodemon index.js"
},
```
+ Create a server directory, and cd into it and do things here
+ WebSocket is a communication protocol which provides a full-duplex and low-latency channel between the server and the browser.



