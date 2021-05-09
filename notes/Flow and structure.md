---
tags: [chatapi]
title: Flow and structure
created: '2021-05-03T20:24:54.434Z'
modified: '2021-05-08T13:16:40.497Z'
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

### Json web token decoder middleware
+ This checks every request that passes though it for authorization header.
+ If present then decodes and adds the properties in the req object so that it can be used further in the application everywhere.

### Auth schema, model, controller and router
+ Same process ad that of user schema.
+ It returns authorization token on successful login.

---
# Structure
+ Root
  + Server
    + index server - main server file where we create our server
  + Controllers
    + Auth controller
      + onLoginUser
      + onSignupUser
    + User controller
      + onGetAllUsers
      + onCreateUser
      + onGetUserById
      + onGetUserByPhoneNumber
      + onDeleteUserById
      + onDeleteUserByPhoneNumeber
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
    + Auth router
      + Login - and get authtoken
      + Signup -and then again login to get token
    + Users router
      + get all users
      + get users by id
      + get user by phone number
      + post create new user
      + delete user by id
      + delete user by phone number
    + ChatRoom Router
      + get recent conversations(all)
      + get recent conversation by id
      + post initiate a conversation
      + post post a message with given room id
      + put read mark on a chat room
  + Middlewares
    + Json web token decoder
  + Config
    + config.js - contains all configuration variables

      
