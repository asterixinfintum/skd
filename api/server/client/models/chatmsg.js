const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatMsgSchema = new Schema({
    user: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    },
    from: {
        type: String //userid ==> this is from agents to the user
    },
    time: {
        type: String
    },
    seen: {
        type: Boolean,
        default: false
    }
});

const ChatMessage = mongoose.model('ChatMessage', chatMsgSchema);

module.exports = ChatMessage;