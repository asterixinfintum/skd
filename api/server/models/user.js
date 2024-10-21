const mongoose = require('mongoose');
import jwt from 'jsonwebtoken';

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://db:27017/db';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

import Card from './card';
import Account from './account';
import Transaction from './transaction';
import Message from './message';

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

function dateOneYearFromNow() {
    // Get the current date
    const currentDate = new Date();

    // Add one year to the current date
    currentDate.setFullYear(currentDate.getFullYear() + 1);

    // Extract the month and day
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Return the date in MM/DD format
    return `${month}/${day}`;
}

userSchema.statics.checkforduplicates = async function (email, phonenumber) {
    const userwthemail = await this.findOne({ email });
    const userwthphone = await this.findOne({ phonenumber })

    if (userwthemail) {
        throw new Error({ message: 'error', type: 'auth', reason: 'Email in use' });
    }

    if (userwthphone) {
        throw new Error({ message: 'error', type: 'auth', reason: 'Phone number in use' });
    }

    return { message: 'success', type: 'auth' };
}

userSchema.statics.register = function (user) {
    return new Promise(async (resolve, reject) => {
        try {
            const User = this;
            const newuser = new User(user);

            newuser.emailcofirmed = false;

            const payload = {
                _id: newuser._id,
                email: newuser.email
            };
            const token = jwt.sign(payload, process.env.secretKeyJWT);
            const tokens = [token]

            newuser.tokens = tokens;

            const visa = new Card({
                user: newuser._id,
                type: 'Visa',
                digits: '****',
                expiry: dateOneYearFromNow(),
                cvv: '****'
            });

            const master = new Card({
                user: newuser._id,
                type: 'Master',
                digits: '****',
                expiry: dateOneYearFromNow(),
                cvv: '****'
            });

            const cards = [master._id, visa._id];

            const account = new Account({
                user: newuser._id,
                cards
            });

            newuser.account = account._id;

            await visa.save();
            await master.save();
            await account.save();
            await newuser.save();

            resolve({ message: 'success', type: 'auth', content: newuser });
        } catch (error) {
            console.log(error)
            reject({ message: 'error', type: 'auth', reason: error });
        }
    })
}

userSchema.statics.createmsg = function (userid, { label, content }) {
    return new Promise(async (resolve, reject) => {
        try {
            const User = this;
            const user = await User.findOne({ _id: userid });
            const msg = new Message({
                user: user._id,
                label,
                content
            });

            await msg.save();
            resolve({ message: 'success', type: 'msg', content: msg });
        } catch (error) {
            reject({ message: 'error', type: 'msg', reason: error });
        }

    });
}

userSchema.statics.getusermsgs = async function (userid) {
    try {
        const User = this;
        const user = await User.findOne({ _id: userid });

        if (user) {
            const msgs = await Message.find({ user: userid, adminmsg: false });

            return { message: 'success', type: 'msg', content: msgs };
        }

        return { message: 'error', type: 'msg', reason: error };
    } catch (error) {
        console.log(error, 'error here yo')
        return { message: 'error', type: 'msg', reason: error };
    }
}

userSchema.statics.login = function ({ email, password }) {
    return new Promise(async (resolve, reject) => {
        try {
            const User = this;

            const validuser = await User.findOne({ email, password });

            if (!validuser) {
                return reject({ message: 'error', type: 'auth', reason: 'invalid user' });
            }

            const payload = {
                _id: validuser._id,
                email: validuser.email
            };
            const token = jwt.sign(payload, process.env.secretKeyJWT);

            const tokens = [token, ...validuser.tokens];
            validuser.tokens = tokens;
            await validuser.save();

            resolve({ message: 'success', type: 'auth', content: validuser });
        } catch (error) {
            reject({ message: 'error', type: 'auth', reason: error });
        }
    })
}

userSchema.statics.addTransferToUser = function (userid, transactionid) {
    return new Promise(async (resolve, reject) => {
        try {
            const User = this;

            const user = await User.findOne({ _id: userid });
            const transfer = await Transaction.findOne({ _id: transactionid });
            const account = await Account.findOne({ _id: user.account });
            const transactions = account.transactions

            transactions.push(transfer._id);

            account.transactions = transactions;
            await account.save();
            resolve({ message: 'success', type: 'user transfer', content: transfer });
        } catch (error) {
            reject({ message: 'error', type: 'transfer', reason: error });
        }
    });
}

userSchema.statics.getTransactions = function (userid) {
    return new Promise(async (resolve, reject) => {
        try {
            const account = await Account.findOne({ user: userid });
            const transactions = account.transactions;

            const txnsPromises = transactions.map(async transaction => {
                const txn = await Transaction.findOne({ _id: transaction });
                return txn
            });

            const txnsarr = await Promise.all(txnsPromises);
            const txns = txnsarr.filter(txn => txn !== undefined);

            resolve({ message: 'success', type: 'user transfer', content: txns });
        } catch (error) {
            reject({ message: 'error', type: 'transactions', reason: error });
        }
    })
}

userSchema.statics.updatepassword = function (userid, newpassword, oldpassword) {
    return new Promise(async (resolve, reject) => {
        try {
            const User = this;
            const user = await User.findOne({ _id: userid });

            if (user.password === oldpassword) {
                user.password = newpassword;
                await user.save();
                resolve({ message: 'success', type: 'password change', content: user });
            } else {
                reject({ message: 'error', type: 'password change', reason: 'wrong password' });
            }
        } catch (error) {
            reject({ message: 'error', type: 'password change', reason: error });
        }
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;
