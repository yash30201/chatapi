---
title: chatRoom API
created: '2021-05-09T09:50:31.358Z'
modified: '2021-05-21T02:38:57.151Z'
---

# chatRoom API

## Initiate

Its very simple, it created a chat room is the room with given spacification is not there otherwise returns the previously created chat room

+ How did we search for chat room with given specification ?
```javascript
const availableChatRoom = await this.findOne({
    userIds : {
        $size : userIds.length,
        $all : [...userIds] ,    
    }
});
```

*This searches all the documents and finds one whose userIds's size is same the the size of the array in context and all the members of userIds are same as that before. This doesn't takes order into considerations and matched the elements like of sorted array!*

---

## Post message

+ This uses a ChatMessage Model.
+ Its fields are _id, postedByUser, message, type, readByReceipients(This in turn is a new mongoose schema with _id : false and  is always associated with chatMessage model and has no existence independently)
+ The readByReceipients field is a array of objects of type readByReceipients Schema.
+ Till now what we have done in other models is just create the required document in return it as it is.
+ But here, the document stored in chatMessage model is this.
```json
{
    "chatRoomId": "fe4fdf32242142f3aa295e328153feee",
    "message": {
        "messageText": "Ara Ara, Konichiwa.."
    },
    "postedByUser": "5d7afe5f20b549ff98088e76a9e27e24",
    "readByRecipients": [
        {
            "readAt": "2021-05-21T02:30:13.990Z",
            "readByUserId": "5d7afe5f20b549ff98088e76a9e27e24"
        }
    ],
    "_id": "996f9e47261644bb86bd2e8ab0e3dc2f",
    "type": "text",
    "createdAt": "2021-05-21T02:30:22.958Z",
    "updatedAt": "2021-05-21T02:30:22.958Z",
    "__v": 0
}
```
+ Here, it will be very resource intensive to get the userdetails for each userid upon receiving the data(as other subscribers will not have sufficient data of each member of room), so we before hand modify the response with some lookups(table joins in case of SQL) and then grouping the array of data into one. For eg,
  + chatRoomId can be replaced by its document from rooms and substituted here - 
  + ```js
    {
        $lookup : {
            from : 'users',
            localField : 'postedByUser',
            foreignField : '_id',
            as : 'postedByUser', // since this field is same as that of localField so this will substitute the local field, if the name is different the new field at the end of the document will be created.
        }
    },
    ```
+ The $group, function requires a _id(**exactly this name otherwise it will throw mongo error) so that it will group all the objects of the array with this as a common field.
+ The addToSet method adds all the different values in different objects to a single array of objects.
+ whereas $last takes the value of the lsat object of the array.

The whole aggregate query is this - 
```js
const aggregate = await this.aggregate([
    { $match : {_id : post._id}},
    {
        $lookup : {
            from : 'users',
            localField : 'postedByUser',
            foreignField : '_id',
            as : 'postedByUser',
        }
    },
    { $unwind : '$postedByUser'},
    {
        $lookup : {
            from : 'rooms',
            localField : 'chatRoomId',
            foreignField : '_id',
            as : 'chatRoomId',
        }
    },
    { $unwind : '$chatRoomId'},
    { $unwind : '$chatRoomId.userIds'},
    {
        $lookup : {
            from : 'users',
            localField : 'chatRoomId.userIds',
            foreignField : '_id',
            as : 'chatRoomId.userIds',
        }
    },
    { $unwind : '$chatRoomId.userIds'},
    {
        $group : {
            _id : '$_id',
            chatRoomId : {$last : '$chatRoomId._id'},
            message : {$last : '$message'},
            type : {$last : '$type'},
            postedByUser : {$last : '$postedByUser'},
            chatRoomUsers : {$addToSet : '$chatRoomId.userIds'},
            readByRecipients : {$last : '$readByRecipients'},
            createdAt : {$last : '$createdAt'},
            updatedAt : {$last : '$updatedAt'},
        },
    }
]);
```




