const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        requireed: true
    },
    description: {
        type: String,
        requireed: true
    },
    tag: {
        type: String,
        default: "genral"
    },
    date: {
        type: Date,
        default: Date.now
    },

},
// {
//     timestamps: true,
// }
);

module.exports = mongoose.model('notes', NotesSchema);

