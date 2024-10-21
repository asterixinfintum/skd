const mongoose = require('mongoose');
const { Schema } = mongoose;

const quickcontactSchema = new Schema({
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
    accountnumber: {
        type: String,
        required: true
    }
});

const QuickContact = mongoose.model('QuickContact', quickcontactSchema);

module.exports = QuickContact;