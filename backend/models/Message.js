const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats"
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        trim: true
    },

},
    {
        timestamps: true,
    }

);
const Message = mongoose.model('message', MessageSchema);
module.exports = Message;
