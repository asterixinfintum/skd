const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: 'base'
    },
    cards: {
        type: Array,
        default: []
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    income: {
        type: Number,
        required: true,
        default: 0
    },
    loans: {
        type: Array,
        default: []
    },
    transactions: {
        type: Array,
        default: []
    },
    savingsplans: {
        type: Array,
        default: []
    },
    supportmessages: {
        type: Array,
        default: []
    },
    accountstatements: {
        type: Array,
        default: []
    },
    investmentplans: {
        type: Array,
        default: []
    },
    investmentgrowth: {
        type: Number,
        default: 0
    },
    savingsaggregate: {
        type: Number,
        default: 0
    },
    savingsaggregatetarget: {
        type: Number,
        default: 0
    },
    loansaggregate: {
        type: Number,
        default: 0
    }
});

accountSchema.statics.addloan = async function (user, loanid) {
    return new Promise(async (resolve, reject) => {
        try {
            const Account = this;
            const acc = await Account.findOne({ user });
            const loans = acc.loans;

            loans.push(loanid)
            acc.loans = loans;

            await acc.save()
            resolve({ message: 'success', type: 'loan application for user', content: acc });
        } catch (error) {
            reject({ message: 'error', type: 'auth', reason: error });
        }
    });
}

accountSchema.statics.addinvestmentplan = async function (user, investmentid, amount) {
    try {
        const Account = this;
        const acc = await Account.findOne({ user });

        if (acc.balance > amount) {
            const investmentplans = acc.investmentplans;
            investmentplans.push(investmentid);
            acc.investmentplans = investmentplans;

            const updatedbalance = acc.balance - amount;
            acc.balance = updatedbalance;

            await acc.save();

            return { message: 'success', type: 'loan application for user', content: acc };
        }
    } catch (error) {
        return { message: 'error', type: 'auth', reason: error };
    }
}

accountSchema.statics.addsavingsplan = async function (user, newusersavingsid, amount) {
    try {
        const Account = this;
        const acc = await Account.findOne({ user });

        if (acc.balance > amount) {
            const savingsplans = acc.savingsplans;

            const updatedbalance = acc.balance - amount;
            acc.balance = updatedbalance;

            savingsplans.push(newusersavingsid);
            acc.savingsplans = savingsplans;

            await acc.save();
        } else {
            throw error
        }
    } catch (error) {
        throw error
    }
}


accountSchema.statics.createuserloan = async function (user, body) {
    return new Promise(async (resolve, reject) => {
        try {
            const Account = this;
            const acc = await Account.findOne({ user });

        } catch (error) {

        }
    })
}

accountSchema.statics.createusersavimgs = async function (user, body) {
    return new Promise(async (resolve, reject) => {
        try {
            const Account = this;
            const acc = await Account.findOne({ user });

        } catch (error) {

        }
    })
}

accountSchema.statics.createuserinvestment = async function (user, body) {
    return new Promise(async (resolve, reject) => {
        try {
            const Account = this;
            const acc = await Account.findOne({ user });

        } catch (error) {

        }
    })
}

accountSchema.statics.getuserinvestments = async function (user) {
    return new Promise(async (resolve, reject) => {
        try {
            const Account = this;
            const acc = await Account.findOne({ user });

            console.log(acc);
        } catch (error) {
            reject({ message: 'error', type: 'auth', reason: error });
        }
    })
}

accountSchema.statics.updateBalance = async function (user, balanceupdate) {
    return new Promise(async (resolve, reject) => {
        try {
            const Account = this;
            const account = await Account.findOne({ user });

            account.balance = balanceupdate;
            await account.save();

            resolve({ message: 'success', type: 'balance update', content: account });
        } catch (error) {
            reject({ message: 'error', type: 'balance update', reason: error });
        }
    })
}

accountSchema.statics.updateType = async function (user, accounttype) {
    return new Promise(async (resolve, reject) => {
        try {
            const Account = this;
            const account = await Account.findOne({ user });

            if (account.type !== accounttype) {
                account.type = accounttype;
                await account.save();
                resolve({ message: 'success', type: 'account type update', content: account });
            } else {
                resolve({ message: 'no need', type: 'account type update', content: account });
            }
        } catch (error) {
            reject({ message: 'error', type: 'update type', reason: error });
        }
    })
}

accountSchema.statics.updatefigures = async function ({
    user,
    balance,
    loansaggregate,
    income,
    savingsaggregatetarget,
    savingsaggregate,
    investmentgrowth
}) {

    return new Promise(async (resolve, reject) => {
        try {
            const Account = this;
            const account = await Account.findOne({ user });

            if (balance) {
                account.balance = balance;
            }

            if (loansaggregate) {
                account.loansaggregate = loansaggregate;
            }

            if (income) {
                account.income = income;
            }

            if (savingsaggregatetarget) {
                account.savingsaggregatetarget = savingsaggregatetarget;
            }

            if (savingsaggregate) {
                account.savingsaggregate = savingsaggregate;
            }

            if (investmentgrowth) {
                account.investmentgrowth = investmentgrowth;
            }

            await account.save();
            resolve({ message: 'success', type: 'update account figures', content: account });
        } catch (error) {
            reject({ message: 'error', type: 'update account figures', reason: error });
        }
    })
}

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;