//Import express 
const express = require('express');
//Import our config file to connect to mongo db
const db = require('./config/connection');
//Import our routes to the server
const routes = require('./routes');
//PORT 3001
const PORT = process.env.PORT || 3001;
const app = express();
//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
//Connect to our mongo database
db.once('open',() => {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}!`);
  });
})
