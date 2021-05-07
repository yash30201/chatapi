---
tags: [chatapi]
title: User API
created: '2021-05-06T18:46:37.147Z'
modified: '2021-05-07T04:58:57.771Z'
---

# User API
### What is the underlying process ? 
+ All the custom queries is defined in terms of mongoose queries inside the user model.
  + For eg
  + ```
    userSchema.statics.getUserByPhoneNumber = async function(phoneNumber){
        try{
            const user = await this.findOne({ phoneNumber : phoneNumber});
            if(!user) throw({message : 'No such user exists with this phone number'});
            return user;
        } catch(err){
            throw err;
        }
    }
    ``` 
+ The controllers just see if validation check is passed or not and then if passed then calls the required custom made method of usermodel else returns errors
  + ```
    const onGetUserByPhoneNumber = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const user = await usermodel.model.getUserByPhoneNumber(req.params.number);
            return res.status(200).json({ success: true, user: user });
        } catch(err){
            return res.status(500).json( {success: false , error : err});
        }
    }
    ```
+ The routers will have proper validating middle wares before linking the route with its processing function.
+ This validations is achieved using express-validator.
  + We take on the subjects of validation and apply proper validation one by one.
  + Subjects - `body('key')` , `query('key')` or `param('key')`
  + We can do two things- 
    + Validate the data - isNumeric(), isUpperCase(), etc
    + Synthesis/format the data - toUpperCase(), etc
  + All the errors are stored in the req parameter which is forwarded to the processing function.
  + In processing function, we get the errors array fromm req using `validationResult(req)`




