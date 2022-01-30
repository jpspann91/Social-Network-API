//Import router functions from express
const router = require('express').Router();

//Route to our /api folder
const apiRoutes = require('./api');

//Use the routes in our api folder for to create localhost:3001/api
router.use('/api', apiRoutes);

//If any thing else throw up a wrong route 
router.use((req, res) => {
    return res.send('Wrong route!');
})

//Export the router
module.exports = router;