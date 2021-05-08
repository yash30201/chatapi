---
title: Web Socket class
created: '2021-05-08T10:47:17.639Z'
modified: '2021-05-08T11:34:03.398Z'
---

# Web Socket class
+ The purpose of any object in this class is to create a web socket(full deplex communication system) that will keep track of the users which are active and then listen to what its clients want to do and then does the needful. This is given in the socket.io `connection`listener. 
+ This class has three important parts - 
  + Users array
  + Connection method
  + subscribeOtherUsers method - Subscribing a user to all other end points of any other specific user(like if he is connected with different mediums like that of a mobile and a pc simultaneosly).

+ SubscibeOtherUsers functioning - It searches all instances of otherUsers socket connections and then makes all of them join the room specified in the aurgument. Thus the name, subscribing other users.

+ Connection method has four listeners - 
  + `disconnect` , `makeConnection`, `subscribe` and `unsubscribe`.
  + In disconnect, we remove all the userSockets where socketId matches with that of clientSocketId. Why didn't we removed all users with that user id? Because the user may just want to disconnect from his laptop and stay connected with his mobile phone.
  + In makeConnection, the userSocket is added to the user array like this
    + ```
      this.users.push({
        socketId : client.id, 
        userId : userId
      })
      ```
  + In subscribe method, we first make all the instances of otheruser with whom we want to chat join room we asked for using subscribeOtherUsers method and then we ourself join the room.
  + In unsubscribe method, the client leaves the room.

+ After all this, we create make the socket.io to listen to server and when `connection` comes, WebSockets.connection will handel it.
```
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection);
```


  
