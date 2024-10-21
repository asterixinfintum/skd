const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Visa', 'Master']
    },
    digits: {
        type: String,
        required: true,
    },
    expiry: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    }
});

cardSchema.statics.updatecard = async function (cardid, { digits, expiry, cvv }) {
    try {
        const Card = this;
        const carditem = await Card.findOne({ _id: cardid });

        carditem.digits = digits;
        carditem.expiry = expiry;
        carditem.cvv = cvv;

        await carditem.save();
        return { message: 'success', type: 'admin card update', content: carditem };
    } catch (error) {
        return { message: 'error', type: 'admin card update', reason: error };
    }
}

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;