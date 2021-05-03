---
tags: [chatapi]
title: Structure
created: '2021-05-03T20:24:54.434Z'
modified: '2021-05-03T20:43:45.955Z'
---

# Structure
+ Root
  + Main index file - root target
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

      
