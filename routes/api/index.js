//import router from express package
const router = require('express').Router();

//Create variable for our thought routes file
const thoughtRoutes = require('./thoughtRoutes');
//Create a variable for our user routes file
const userRoutes = require('./userRoutes');

//Creates route localhost:3001/api/thoughts using thoughtRoutes file
router.use('/thoughts', thoughtRoutes);
//Creates route localhost:3001/api/users using userRoutes file
router.use('/users', userRoutes);

//Export the router 
module.exports = router;