//USER MODEL
//Import schema and model from mongoose
const {Schema, model} = require('mongoose');

//Create User Schema
const UserSchema = new Schema(
    {
        
        username: {
            type: String,
            unique: true,
            required: 'What\'s is in a name?, please enter yours so we know what to call you',
            trim: true
        },

        email: {
            type: String,
            required: 'Please enter a valid email address',
            unique: true,
            validate: {
                validator(validEmail){
                    //Regex to validate the email
                    return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(validEmail);
                },
                message: 'Please enter a valid email address'
            }
        },
        //Thoughts array references Thought Schema
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        //Friends array references USer Schema
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//Friend count virtual
UserSchema.virtual('friendCount').get(function (){
    return this.friends.length
})

//Variable to hold our User model
const User = model('User', UserSchema);

//Export the user model
module.exports = User