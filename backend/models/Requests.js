const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequestSchema = new Schema({
    user1: {                                 // Request Sender ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    user2: {                                // Request Receiver ID
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    user1e: {                                // Request Sender email
        type: String,
        requireed: true
    },
    name1:  {                                // Request Sender name
        type: String,
        requireed: true
    }, 
    user2e: {                                // Request Receiver email
        type: String,
        default: ""
    },
    name2: {                                // Request Receiver name
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('requests', RequestSchema);

