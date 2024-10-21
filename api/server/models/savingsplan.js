const mongoose = require('mongoose');
const { Schema } = mongoose;

const savingsplanSchema = new Schema({
    foruser: {
        type: String,
        default: null //use this to show the particular loan to one user
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [],
    compoundingfrequency: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        default: 0.05
    },
    minimumaccountbalance: {
        type: Number,
        default: 5000
    },
    minimumdeposit: {
        type: Number,
        default: 1000
    },
    contributionplan: {
        frequency: {
            type: Number,
            default: 500
        },
        frequencyunit: {
            type: String
        }
    },
    term: {
        duration: {
            type: Number,
            required: true
        },
        unit: {
            type: String
        },
    },
});

savingsplanSchema.statics.createsavingsitem = async function (savingsplan) {
    try {
        const newsavingsitem = new this(savingsplan);
        await newsavingsitem.save();
        return { message: 'success', type: 'item created', content: newsavingsitem };
    } catch (error) {
        // Optionally, you can log the error here
        // e.g., console.error('Error creating savings item:', error);
        throw new Error(`Item creation failed: ${error.message}`);
    }
}

savingsplanSchema.statics.getsavingsitems = async function () {
    try {
        const savingsplans = await this.find();
        return { message: 'success', type: 'savings items get', content: savingsplans };
    } catch (error) {
        // Optionally, log the error here for debugging
        // e.g., console.error('Error getting savings items:', error);
        throw new Error(`Error getting savings items: ${error.message}`);
    }
}

const SavingsPlan = mongoose.model('SavingsPlan', savingsplanSchema);

module.exports = SavingsPlan;