//Require router() from express framework
const router = require('express').Router();

//Create an object with all of our controller methods imported from controllers folder
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    createReaction,
    updateThought,
    deleteReaction
} = require('../../controllers/thoughtController')

//api/thoughts
router
    .route('/')
    .get(getAllThoughts)
//api/thoughts/:userId
router 
    .route('/:userId')
    .post(createThought)
//api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
//api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(createReaction)
//api/thoughts/:thoughtID/:reactionId
router
    .route('/:thoughtId/:reactionId')
    .delete(deleteReaction);

module.exports = router;