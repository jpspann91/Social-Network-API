//Import connecion and connectino from mongoose
const { connect, connection } = require('mongoose');

//Connection string
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB';

//Call connect function to connect to mongoDB
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Export the connection 
module.exports = connection;