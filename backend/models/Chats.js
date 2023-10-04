const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatsSchema = new Schema({
    friendID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friends"
    },
    groupName: {
        type: String,
        default: ""
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    usersID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    usersName: [{
        type: String,
        requireed: true
    }],
    groupAdminID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    groupCreaterID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
    {
        timestamps: true,
    }

);
const Chats = mongoose.model('chats', ChatsSchema);
module.exports = Chats;
