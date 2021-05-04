---
title: Configurations
created: '2021-05-04T11:34:08.505Z'
modified: '2021-05-04T12:44:58.183Z'
---

# Configurations
+ Create a configurations directory and inside it place the configurations files
+ Create a config.js file where we store general configuration variables/properties and import things from here
---
# MongoDb
+ Write the configuration parameters related to mongodb
```
const config = {
  db: {
    url: 'localhost:27017',
    name: 'chatdb'
  }
}
export default config
```
+ In server/index.js file, create Db and connect to it
  + Create connnection url by taking parameters from index config file
  + Use the options [useNewUrlParser](https://mongoosejs.com/docs/connections.html#options) and [useUnifiedTopology](https://mongoosejs.com/docs/connections.html#options).
  + Mongo db has four connection states, define what to do for each connection state
    + label - `connected`, `reconnected`, `error`, `disconnected`.
    + ```
      mongoose.connection.on(label, () => {
        console.log(corresponding label message string);
      })
      ```
    + Incase of `lable = error`, we disconnect from db purposely to break the connection to have scope of restarting, `mongoose.disconnect();`
