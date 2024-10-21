const mongoose = require('mongoose');

const { Schema } = mongoose;

import User from './user';

const messageSchema = new Schema({
    user: {
        type: String,
        default: null
    },
    label: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    adminmsg: {
        type: Boolean,
        default: false
    }
});

messageSchema.statics.addadminmessage = async function (body) {
    try {
        const newmessage = new this(body); // Directly use 'this' to create a new instance
        await newmessage.save();

        return { message: 'success', type: 'message create', content: newmessage };
    } catch (error) {
        // Throwing a standard Error object with a descriptive message
        throw new Error(`Message creation failed: ${error.message}`);
    }
}

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;