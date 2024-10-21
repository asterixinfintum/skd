const mongoose = require('mongoose');

const { Schema } = mongoose;

const userContactSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    contactname: {
        type: String,
        required: true
    },
    contactaccountno: {
        type: String,
        required: true
    },
    contactbank: {
        type: String,
        required: true
    }
});

userContactSchema.statics.createcontact = function ({ userid, contactname, contactaccountno, contactbank }) {
    return new Promise(async (resolve, reject) => {
        try {
            const UserContact = this;

            const newcontact = await new UserContact({
                userid, contactname, contactaccountno, contactbank
            });

            await newcontact.save();
            resolve({ message: 'success', type: 'user contact create', content: newcontact });
        } catch (error) {
            reject({ message: 'error', type: 'user contact create', reason: error });
        }
    })
}

userContactSchema.statics.getusercontacts = async function ({ userid }) {
    return new Promise(async (resolve, reject) => {
        try {
            const UserContact = this;

            const quickcontacts = await UserContact.find({ userid });

            resolve({ message: 'success', type: 'user contacts get', content: quickcontacts });
        } catch (error) {
            console.log(error, 'error')
            reject({ message: 'error', type: 'get user quick contacts', reason: error });
        }
    })
}

const UserContact = mongoose.model('UserContact', userContactSchema);

module.exports = UserContact;

