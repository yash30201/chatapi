---
tags: [chatapi]
title: Flow and structure
created: '2021-05-03T20:24:54.434Z'
modified: '2021-05-06T18:46:09.636Z'
---

# **Flow and structure**

# Flow

### Boilerplate 
+ We create the boilerplate for our api by importing and placing middlewares
+ Creating and palcing routers.
+ Creating and placing controller and their functions for respective routers.
+ Creating the error middleware at last
+ Creating and listeing from server.

### User schema, model, controller and router
+ Create schema and model
+ Validate data in controller before using the data using express-validator
+ If valid the do the needful and return the processed data
+ else return error message with status
+ Read User API note for more details

---
# Structure
+ Root
  + Server
    + index server - mail server file where we create our server
  + Controllers
    + User controller
      + onGetAllUsers
      + onCreateUser
      + onGetUserById
      + onGetUserByEmail
      + onDeleteUserById
    + ChatRoom controller
      + getRecentConversation
      + getRecentConversationByRoomId 
      + initiate
      + postMessage
      + markConversationReadByRoomId
    + Delete controller
      + deleteRoomById
      + deleteMessageById
  + Routers
    + Index router - used for login 
    + Users router
      + get all users
      + get users by id
      + get user by email
      + post create new user
      + delete user by id
    + ChatRoom Router
      + get recent conversations(all)
      + get recent conversation by id
      + post initiate a conversation
      + post post a message with given room id
      + put read mark on a chat room
  + Middlewares
    + Json web token(jwt)
      + Used to preprocess/configure the services provided by jwt middleware and exprote these modified services instead of original ones

      
