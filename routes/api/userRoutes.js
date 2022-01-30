//Import the router from express
const router = require('express').Router();

//Immport route functionality from our controllers
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController')


router
    //Route for localhost:3001/api/users
    .route('/')
    //GET route function
    .get(getAllUsers)
    //POST route function
    .post(createUser)

router
    //Route for localhost:3001/api/users/:id with id param
    .route('/:id')
    //GET route function
    .get(getUserById)
    //PUT route function
    .put(updateUser)
    //DELETE route function
    .delete(deleteUser)

router
    //Route for localhost:3001/api/users/:id/friends/:friendId
    .route('/:id/friends/:friendId')
    //POST route function
    .post(addFriend)
    //DELETE route function
    .delete(removeFriend)

//Export the entire router variable
module.exports = router