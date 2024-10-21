const mongoose = require('mongoose');
const { Schema } = mongoose;

import Account from './account';

const transactionSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    destinationbank: {
        type: String,
        required: true,
    },
    destinationcountry: {
        type: String,
        required: true,
    },
    destinationaccount: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: { type: String, default: Date.now }
});

transactionSchema.statics.createtransaction = async function ({
    amount,
    type,
    status,
    date,
    destinationcountry,
    destinationbank,
    destinationaccount,
    user
}) {
    try {
        const amnt = parseFloat(`${amount}`.replace(/,/g, ''), 10);
        // Consider adding validation for `amnt` here

        const newtransaction = new this({
            amount: amnt,
            type,
            status,
            date,
            destinationcountry,
            destinationbank,
            destinationaccount,
            user
        });

        const account = await Account.findOne({ user });
        if (!account) {
            throw new Error('Account not found');
        }

        account.transactions.unshift(newtransaction._id);

        if (type === 'deposit') {
            account.balance += amnt; // Assumes balance is already a number
        }

        // Consider using a transaction here
        await newtransaction.save();
        await account.save();

        return { message: 'success', type: 'balance update', content: { account, newtransaction } };
    } catch (error) {
        // Throwing a standard Error object with a descriptive message
        throw new Error(`Transaction creation failed: ${error.message}`);
    }
}

transactionSchema.statics.updatetransaction = async function ({
    id,
    amount,
    type,
    status,
    date,
    destinationcountry,
    destinationbank,
    destinationaccount,
}) {
    try {
        const Transaction = this;

        const transact = await Transaction.findOne({ _id: id });
        transact.amount = parseFloat(`${amount}`.replace(/,/g, ''), 10);
        transact.type = type;
        transact.status = status;
        transact.date = date;
        transact.destinationcountry = destinationcountry;
        transact.destinationbank = destinationbank;
        transact.destinationaccount = destinationaccount


        await transact.save();

        return { message: 'success', type: 'transaction update', content: transact }
    } catch (error) {
        throw new Error(error)
    }
}

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;