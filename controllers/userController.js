const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: ('-__v')
            })
            .select('-__v')
            .then(userDataDb => res.json(userDataDb))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .select('-__v')
            .then((userDataDb) => {
                if (!userDataDb) {
                    res.status(404).json({ message: 'No user with that ID!' });
                    return;
                }
                res.json(userDataDb);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    createUser(req, res) {
        console.log('BODY OBJECT:', req.body);
        User.create(req.body)
            .then(userDataDb => res.json(userDataDb))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((userDataDb) => {
                if (!userDataDb) {
                    res.status(404).json({ message: "No user with that ID!" })
                    return;
                }
                res.json(userDataDb);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((userDataDb) => {
                if (!userDataDb) {
                    res.status(404).json({ message: "No user with that ID!" })
                    return;
                }//When user is deleted, update all users where this friend exists
                User.updateMany(
                    {_id: {$in: userDataDb.friends}},
                    {$pull: {friends: req.params.id}}
                )
                .then(()=> {
                    Thought.deleteMany({username: userDataDb.username})
                    .then(()=>{
                        res.json({message: 'Successfully deleted this user!'})
                    })
                    .catch((err) => {res.status(400).json(err)})
                })
                .catch((err) => {res.status(400).json(err)})
            })
            .catch((err) => {res.status(400).json(err)})
    },
    addFriend(req,res){
        User.findByIdAndUpdate(
            {_id: req.params.id},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
            )
            .select('-__v')
            .then((userDataDb)=> {
                if(!userDataDb){
                    res.status(404).json({ message: "No user with that ID!" })
                    return;
                }
                res.json(userDataDb);
            })
            .catch((err)=>{
                res.status(400).json(err)
            })
    },
    removeFriend(req,res){
        User.findByIdAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: req.params.friendId}},
            {new: true, runValidators: true}
            )
            .then((userDataDb) => {
                if(!userDataDb){
                    res.status(404).json({message: 'No friend with that ID!'});
                    return;
                }
                res.json(userDataDb)
            })
            .catch((err)=>{
                res.status(400).json(err)
            })

    }
}
module.exports = userController;