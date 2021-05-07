---
title: AuthAPI
created: '2021-05-07T17:21:41.918Z'
modified: '2021-05-07T17:32:35.955Z'
---

# AuthAPI
## Concept - 
+ The purpose of authorization is to give user a authToken.
+ This auth token is given upon proper username and password matching.
+ Password is stored in hash format in database (achieved using bcryptjs).
+ Upon authorization, a JsonWebToke(aka authToken) is created which contains userId and other information and signature by SECRET_KEY (defined by developer in congifuration file)
+ This token can be decoded using the same signature and allows us to retrieve the userId
+ Any type of mishandling in this authToken results in verification failure.
+ So this token is sent in every json request in header as authorization.
+ Without this header, access is denied.
---
Process is same as that of the userAPI. The extras to be notes are as follows - 
+ In SignUp user, first user is created in users DB so that if there is any collision in phone number, it would result in error.
+ After that, user is created in auths DB having the same is as that of the user in users DB.


