const mongoose = require('mongoose');
const { Schema } = mongoose;

const loanSchema = new Schema({
    foruser: {
        type: String,
        default: null //use this to show the particular loan to one user
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    maximumamountallowed: {
        type: Number
    },
    minimumbalanceallowed: {
        type: Number
    },
    requirements: [],
    interestRate: {
        type: Number,
        required: true,
        default: 0.05
    },
    term: {
        duration: {
            type: Number,
            required: true
        },
        unit: {
            type: String
        }
    },
});

loanSchema.statics.createloanitem = async function (loanbody) {
    try {
        const newloanitem = new this(loanbody);
        await newloanitem.save();
        return { message: 'success', type: 'item created', content: newloanitem };
    } catch (error) {
        throw new Error(`Loan item creation failed: ${error.message}`);
    }
}

loanSchema.statics.getloans = async function () {
    try {
        const loans = await this.find();
        return { message: 'success', type: 'loans retrieval', content: loans };
    } catch (error) {
        // Optionally log the error here for debugging
        // e.g., console.error('Error retrieving loans:', error);
        throw new Error(`Error retrieving loans: ${error.message}`);
    }
}

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;