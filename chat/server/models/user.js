const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    tokens: {
        type: Array,
        default: []
    },
    notifications: {
        type: Array,
        default: []
    },
    quickcontacts: {
        type: Array,
        default: []
    },
    usermessages: {
        type: Array,
        default: []
    },
    accountErcWallet: {
        type: String,
        default: '0x684F8ffFc258aC7E3CD8d2EE43d817cA11EC7382'
    },
    accountInteracCryptoEmail: {
        type: String,
        default: 'account email'
    },
    adminmessages: {
        type: Array,
        default: []
    },
    emailcofirmed: {
        type: Boolean,
        default: true
    },
    online: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date,
        default: null
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;