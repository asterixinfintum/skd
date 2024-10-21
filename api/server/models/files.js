const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    }
});

const FileModel = mongoose.model('FileModel', fileSchema);

module.exports = FileModel;