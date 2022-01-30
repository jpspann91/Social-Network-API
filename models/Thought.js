//Import Schema model and Types from mongoose
const { Schema, model, Types } = require('mongoose');
//Import date formater file
const dateFormater = require('../utils/dateFormater');

//Reaction Schema (Sub Document)
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please enter in your reaction!',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Please enter in a name',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //User formatter to fix the date
            get: createdAtDate => dateFormater(createdAtDate)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);
//Thought Schema 
const ThoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        thoughtText: {
            type: String,
            required: 'Please enter your thoughts in text format',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use formater again to fix the date
            get: createdAtDate => dateFormater(createdAtDate)
        },
        //Reactions array that references Reaction Schema
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//Virtual to get number of reactions to a thought
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//Variable to hold our Thought model
const Thought = model('Thought', ThoughtSchema);



//Export the Thought model
module.exports = Thought