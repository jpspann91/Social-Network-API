const { Thought, User, Types } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById(req, res) {
        console.log("Paramaters sent: ", req.params)
        Thought.findOne({ thoughtId: req.params.id })
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
    createThought(req, res) {
        console.log('BODY OBJECT:', req.body)
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
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
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { thoughtId: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then((updatedThought) => {
                if (!updatedThought) {
                    return res.status(404).json({ message: 'No thought with this ID!' });
                }
                res.json(updatedThought);
            })
            .catch(err => res.json(err));
    },
    deleteThought(req, res) {
        console.log("Paramaters sent: ", req.params)
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(404).json({ message: 'No thought with that ID!' });
                    return;
                }
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
    createReaction(req, res) {
        console.log("BODY OBJECT:", req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with that ID!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err))
    },
    deleteReaction(req, res) {
        console.log("Paramaters sent: ", req.params)
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
module.exports = thoughtController;