const mongoose = require('mongoose');
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: true,
        default: 'slave',
        enum: ['super', 'master', 'slave']
    }
});

adminSchema.statics.register = function (admin) {
    return new Promise(async (resolve, reject) => {
        try {
            const Admin = this;
            const newadmin = new Admin(admin);

            const payload = {
                _id: newadmin._id,
                username: newadmin.username
            };

            const token = jwt.sign(payload, process.env.secretKeyJWT);

            newadmin.token = token;

            await newadmin.save();

            resolve({ message: 'success', type: 'auth', content: newadmin });

        } catch (error) {
            reject({ message: 'error', type: 'auth', reason: error });
        }
    });
}

adminSchema.statics.login = function ({ username, password }) {
    return new Promise(async (resolve, reject) => {
        try {
            const Admin = this;

            const validadmin = await Admin.findOne({ username, password });

            if (!validadmin) {
                return reject({ message: 'error', type: 'auth', reason: 'invalid user' });
            }

            const payload = {
                _id: validadmin._id,
                username: validadmin.username
            };
            const token = jwt.sign(payload, process.env.secretKeyJWT);

            validadmin.token = token;
            await validadmin.save();

            resolve({ message: 'success', type: 'auth', content: validadmin });
        } catch (error) {
            return reject({ message: 'error', type: 'auth', reason: 'invalid admin' });
        }
    })
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;