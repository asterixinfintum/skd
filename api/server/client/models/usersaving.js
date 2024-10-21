const mongoose = require('mongoose');
const { Schema } = mongoose;

import Account from '../../models/account';
import Savingsplan from '../../models/savingsplan';

const userSavingSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    savingsplanid: {
        type: String,
        required: true, //id of loan item
    },
    amount: {
        type: Number,
        required: true,
    },
    totaldeposit: {
        type: Number,
        required: true,
    },
    bonus: {
        type: Number,
        required: true,
        default: 0
    },
    message: {
        type: String
    },
    target: {
        type: Number,
        required: true
    },
    nameofsavingsplan: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'live' //accepted
    },
    deadline: {
        type: String
    },
    additionaldata: { type: Schema.Types.Mixed, default: {} }
});

userSavingSchema.statics.createsavingsplan = async function (savingsplan) {
    try {
        const Usersavnsplan = this;

        const newusersavings = Usersavnsplan(savingsplan);

        await newusersavings.save();

        await Account.addsavingsplan(newusersavings.user, newusersavings._id, newusersavings.totaldeposit)

        return { message: 'success', type: 'user savingsplan create', content: newusersavings };
    } catch (error) {
        console.log(error, 'check error here')
        throw error;
    }
}

userSavingSchema.statics.getusersavingsplans = async function (user) {
    try {
        const Usersavnsplan = this;
        const usersavingsplans = await Usersavnsplan.find({ user });

        const usersavingsarr = [];

        for (const usersaving of usersavingsplans) {
            const usersavingitem = await Savingsplan.findOne({ _id: usersaving.savingsplanid });

            if (usersavingitem) {
                usersavingsarr.push({
                    usersaving,
                    savingsplanname: usersavingitem.name,
                    savingsplanid: usersavingitem._id
                })
            }
        }

        return { message: 'success', type: 'user savingsplan get', content: usersavingsarr };
    } catch (error) {
        throw Error(error);
    }
}

userSavingSchema.statics.editusersaving = async function ({ amount, bonus, message, status, id }) {
    try {
        const Usersavnsplan = this;
        const usrsavitm = await Usersavnsplan.findOne({ _id: id });

        usrsavitm.amount = amount;
        usrsavitm.bonus = bonus;
        usrsavitm.message = message;
        usrsavitm.status = status;

        await usrsavitm.save();

        return { message: 'success', type: 'user savingsplan edit', content: usrsavitm };
    } catch (error) {
        throw Error(error);
    }
}

userSavingSchema.statics.deposittosavingsitem = async function ({ amount, id }) {
    try {
        const Usersavnsplan = this;
        const usrsavitm = await Usersavnsplan.findOne({ _id: id });
        const usraccount = await Account.findOne({ user: usrsavitm.user });

        const totaldeposit = usrsavitm.totaldeposit;
        const newtotaldeposit = totaldeposit + parseFloat(`${amount}`.replace(/,/g, ''), 10);

        usrsavitm.totaldeposit = newtotaldeposit;
        usrsavitm.amount = newtotaldeposit;

        const usrbalance = usraccount.balance;
        const newusrbalance = usrbalance - parseFloat(`${amount}`.replace(/,/g, ''), 10);

        usraccount.balance = newusrbalance;

        await usraccount.save();

        await usrsavitm.save();

        return { message: 'success', type: 'user savingsplan deposit', content: { usrsavitm, usraccount } };

    } catch (error) {
        throw Error(error);
    }
}

const UserSaving = mongoose.model('UserSaving', userSavingSchema);

module.exports = UserSaving;