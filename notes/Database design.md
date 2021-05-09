---
title: Database design
created: '2021-05-08T13:15:45.419Z'
modified: '2021-05-08T13:42:54.130Z'
---

# Database design

### Collections - 

#### Users
Field Name | Variable type
--- | ---
_id | String (random)
firstName | String
lastName | String
phoneNumber | String                
userType | String

#### ChatRoom
Field Name | Variable type
--- | ---
_id | String (random)
userIds | []array
roomInitiator | String (user id of chat starter)

#### ChatMessage
Field Name | Variable type
--- | ---
_id | String (random)
chatRoomId | String
messageType | String(default => 'text')
message | Object
postedByUser | String
readByRecipients | [] Array

---
### Objects structure
#### readByRecipients
```javascript
{
    readByUser : String,
    readAt : Date (default => Date.now())
}
```
