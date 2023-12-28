const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: "Required",
    },

    email: {
        type: String,
        unique: true,
        required: "Required",
        match: [/.+@.+\..+/, "Must match an email address!"],
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;