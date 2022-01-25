const mongoose = require('mongoose');

mongoose.set('debug', true);

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://localhost:27017/social-network-api-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection 
module.exports = mongoose.connection;