//Import our models
const { User, Thought } = require('../models');

//User controller object with multiple functions
const userController = {
    //Get all Users
    getAllUsers(req, res) {
        //Mongoose model fucntions
        User.find({})
            //populate the user thoughts array
            .populate({
                path: 'thoughts',
                select: ('-__v')
            })
            //Version select
            .select('-__v')
            //userDataDb is what is found from find() search
            .then(userDataDb => res.json(userDataDb))
            //Catch any errors that may occur
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    //Remaining functions follow same format from above
    //Get user by ID
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .select('-__v')
            //Data returned
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
    //POST create a new user
    createUser(req, res) {
        console.log('BODY OBJECT:', req.body);
        User.create(req.body)
            .then(userDataDb => res.json(userDataDb))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    //PUT to update the user
    updateUser(req, res) {
        //find user by id first
        User.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })  
            //Date returned from database call
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
    //DELETE delete user function
    deleteUser(req, res) {
        //Find user by id and delete this works
        User.findOneAndDelete({ _id: req.params.id })
            .then((userDataDb) => {
                console.log(userDataDb);
                //Attempted to get it to delete this person from friends automatically but could not get it to work
                if (!userDataDb) {
                    res.status(404).json({ message: "No user with that ID!" })
                    return;
                }//When user is deleted, update all users where this friend exists does not work
                User.updateMany(
                    
                    {_id: {$in: userDataDb.friends}},
                    {$pull: {friends: req.params.id}}
                )
                .then(()=> {
                    //Tries to also delete all of that persons thoughts does not work
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
    //Add friend 
    addFriend(req,res){
        //Find and update a users friend array with another users id
        User.findByIdAndUpdate(
            {_id: req.params.id},
            {$addToSet: {friends: req.params.friendId}},
            {new: true}
            )
            //Select version
            .select('-__v')
            //User data returned from DB
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
    //Remove friend
    removeFriend(req,res){
        //update friends array find by user id
        User.findByIdAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: req.params.friendId}},
            {new: true, runValidators: true}
            )
            //Data returned from the DB
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
//Export the controller
module.exports = userController;