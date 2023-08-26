const mongoose = require('mongoose');
const { Schema } = mongoose;

const FriendSchema = new Schema({
    user1: {                                 // first user ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    user2: {                                // second user ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    user1e: {                                // first user email
        type: String,
        requireed: true
    },
    user2e: {                                // second user email
        type: String,
        requireed: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('friends', FriendSchema);

