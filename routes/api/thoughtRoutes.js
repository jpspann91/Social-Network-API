const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

router
    .route('/')
    .get(getAllThoughts)

router 
    .route('/:userId')
    .post('createThought')

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(createThought)
    .delete(deleteThought)

router
    .route('/thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction)

module.exports = router;