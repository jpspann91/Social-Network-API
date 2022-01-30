//Import our models
const { Thought, User } = require('../models');

//Thought controller object with differtent methods
const thoughtController = {
    //GET all through
    getAllThoughts(req, res) {
        //Use mongoose function to hit DB
        Thought.find({})
            //Version select
            .select('-__v')
            //Stack newest on the bottom and new ones on top
            .sort({ _id: -1 })
            //Thought data returned
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //Get 1 thought by ID
    getThoughtById(req, res) {
        //Console log our params for testing 
        console.log("Paramaters sent: ", req.params)
        //Find one by thoughtId
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that ID!' })
                    return;
                }
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //POST create a new thgouth
    createThought(req, res) {
        //Console log the body for testing
        console.log('BODY OBJECT:', req.body)
        //Call create mongoose function
        Thought.create(req.body)
            //Id returned from new Thought
            .then(({ _id }) => {
                console.log(_id);
                //Update the user find them from userId parameter. Push the thoughtId to the thoughts array
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
           //User data returned from this  
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID: 1st Error' })
                    return;
                }
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //PUT update a thought 
    updateThought(req, res) {
        //Find thought by thoughtId
        Thought.findOneAndUpdate(
            { thoughtId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
        //Returns the updated thought
            .then((updatedThought) => {
                if (!updatedThought) {
                    return res.status(404).json({ message: 'No thought with this ID!' });
                }
                res.json(updatedThought);
            })
            .catch(err => res.json(err));
    },
    //DELETE deletes the thought by ID
    deleteThought(req, res) {
        //Console log for testing
        console.log("Paramaters sent: ", req.params)
        //Find a thought by id and delete it
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(404).json({ message: 'No thought with that ID!' });
                    return;
                }
                //Update the user so the thought no longer exists
                return User.findOneAndUpdate(
                    { _id: req.params.username },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            .then((userData) => {
                res.json(userData);
            })
            .catch(err => res.json(err))
    },
    //POST to create a reaction
    createReaction(req, res) {
        //Console log the body of the newly created reaction
        console.log("BODY OBJECT:", req.body);
        //Find the thought and update it with the reaction
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            //thought data that is returned 
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that ID!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err))
    },
    //DELETE reaction 
    deleteReaction(req, res) {
        //CL the parameters
        console.log("Paramaters sent: ", req.params)
        //Find thought by ID and update the reaction array, pull it from the array
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thoughtData) => {
                res.json(thoughtData)
            })
            .catch(err => res.json(err))
    }
}
//Export the entire controller
module.exports = thoughtController;