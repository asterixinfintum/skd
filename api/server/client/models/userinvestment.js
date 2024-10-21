const mongoose = require('mongoose');
const { Schema } = mongoose;

import InvestmentPlan from '../../models/investmentplan';

const userInvestmentSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    investmentid: {
        type: String,
        required: true, //id of loan item
    },
    amount: {
        type: Number,
        required: true,
    },
    potentialprofit: {
        type: Number,
        default: 0
    },
    profit: {
        type: Number,
        default: 0
    },
    deduction: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'created'
    },
    message: {
        type: String,
        default: ''
    }
});

userInvestmentSchema.statics.getuserinvestments = async function (user) {
    try {
        const UserInvestmnt = this;
        const userinvestments = await UserInvestmnt.find({ user });
        const investmentsarr = [];

        for (const userinvestment of userinvestments) {
            const investmentitem = await InvestmentPlan.findOne({ _id: userinvestment.investmentid });

            if (investmentitem) {
                investmentsarr.push({
                    userinvestment,
                    investmentname: investmentitem.name,
                    investmentid: investmentitem._id
                })
            }
        }

        return { message: 'success', type: 'user investment get', content: investmentsarr };
    } catch (error) {
        throw new Error(error)
    }
}

userInvestmentSchema.statics.edituserinvestment = async function ({ profit, deduction, status, message, id }) {
    try {
        const UserInvestmnt = this;

        const usrinvst = await UserInvestmnt.findOne({ _id: id });
        usrinvst.profit = parseFloat(profit);
        usrinvst.deduction = parseFloat(deduction);
        usrinvst.status = status;
        usrinvst.message = message;

        await usrinvst.save();

        return { message: 'success', type: 'user investment edit', content: usrinvst }

    } catch (error) {
        throw new Error(error)
    }
}

const UserInvestment = mongoose.model('UserInvestment', userInvestmentSchema);

module.exports = UserInvestment;