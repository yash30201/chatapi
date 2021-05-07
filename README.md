# Chat api

Chech the docs at [postman docs](https://documenter.getpostman.com/view/15604030/TzRRC8bB)
---
## Structure
+ Root
  + Server
    + index server - main server file where we create our server
  + Controllers
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
---