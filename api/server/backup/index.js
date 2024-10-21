import express from 'express';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

import User from '../models/user';
import Account from '../models/account';
import SavingsPlan from '../models/savingsplan';
import UserContact from '../models/usercontact';
import Card from '../models/card';
import FileModel from '../models/files';
import InvestmentPlan from '../models/investmentplan';
import Loan from '../models/loan';
import Message from '../models/message';
import Notification from '../models/notification';
import Transaction from '../models/transaction';
import Admin from '../admin/models/admin';
import UserInvestment from '../client/models/userinvestment';
import UserLoan from '../client/models/userloan';
import UserSaving from '../client/models/usersaving';
import ChatMessage from '../client/models/chatmsg';


const backup = express();

let targetPath;
let jsonData;
let jsonDataStringify;

backup.get('/triggerbackup', async (req, res) => {
    const { dtr } = req.query;

    if (dtr === 'users') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'users.json');

        runbackup(targetPath, User);
    }

    if (dtr === 'accounts') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'accounts.json');

        runbackup(targetPath, Account);
    }

    if (dtr === 'cards') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'cards.json');

        runbackup(targetPath, Card);
    }

    if (dtr === 'chatmessages') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'chatmessages.json');

        runbackup(targetPath, ChatMessage);
    }

    if (dtr === 'filemodels') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'filemodels.json');

        runbackup(targetPath, FileModel);
    }

    if (dtr === 'investmentplans') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'investmentplans.json');

        runbackup(targetPath, InvestmentPlan);
    }

    if (dtr === 'loans') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'loans.json');

        runbackup(targetPath, Loan);
    }

    if (dtr === 'messages') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'messages.json');

        runbackup(targetPath, Message);
    }

    if (dtr === 'notifications') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'notifications.json');

        runbackup(targetPath, Notification);
    }

    if (dtr === 'savingsplans') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'savingsplans.json');

        runbackup(targetPath, SavingsPlan);
    }

    if (dtr === 'transactions') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'transactions.json');

        runbackup(targetPath, Transaction);
    }

    if (dtr === 'usercontacts') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'usercontacts.json');

        runbackup(targetPath, UserContact);
    }

    if (dtr === 'userinvestments') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'userinvestments.json');

        runbackup(targetPath, UserInvestment);
    }

    if (dtr === 'userloans') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'userloans.json');

        runbackup(targetPath, UserLoan);
    }

    if (dtr === 'usersavings') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'usersavings.json');

        runbackup(targetPath, UserSaving);
    }

    if (dtr === 'admins') {
        targetPath = path.resolve(__filename, '..', '..', '..', 'datab', 'admins.json');

        runbackup(targetPath, Admin);
    }
});

function runbackup(targetPath, Model) {
    fs.readFile(targetPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        try {
            // Parse the file contents as JSON
            jsonData = JSON.parse(data);

            jsonData.map(async info => {
                info._id = new mongoose.Types.ObjectId(info._id);

                const item = await Model.findOneAndUpdate(
                    { _id: info._id },
                    info,
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                );

                console.log(item)
            });

            //res.status(200).send({ success })
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(405).send({ parseError })
        }
    });
}

export default backup;