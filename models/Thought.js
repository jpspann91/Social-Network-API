const { Schema, model, Types } = require('mongoose');
const { Thought } = require('.');
const dateFormater = require('../utils/dateFormater');

const ThoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        thoughtText: {
            type: String,
            required: 'Please enter your thgouhts in text format',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtDate => dateFormater(createdAtDate)
        },
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

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);


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
            get: createdAtDate => dateFormater(createdAtDate)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = Thought