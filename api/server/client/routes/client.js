import express from 'express';
import multer from "multer";

import User from '../../models/user';
import Account from '../../models/account';
import Card from '../../models/card';
import Transaction from '../../models/transaction';
import UserContact from '../../models/usercontact';
import UserLoan from '../models/userloan';
import Notification from '../../models/notification';
import Message from '../../models/message';
import UserInvestment from '../models/userinvestment';
import UserSaving from '../models/usersaving';
import FileModel from '../../models/files';
import InteracTransfer from '../models/interactransfer';

import authenticateToken from '../../utils/authenticateToken';

const client = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: function (req, file, cb) {
        // Preserve the original file name and extension
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

client.get('/currentclient', authenticateToken, async (req, res) => {

    if (req.user && req.user._id) {
        const { id } = req.query;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(405).send({ error: 'not alowed' })
        }

        const account = await Account.findOne({ _id: user.account });
        const cards = await Card.find({ user: user._id });

        return res.status(200).send({ success: { message: 'success', type: 'auth', content: { user, account, cards } } });
    }

    res.status(405).send({ error: 'not alowed' });
});

client.post('/transaction/transfer', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        const { nameofbnk, country, accountno, amounttosend } = req.body;

        const newtransfer = new Transaction({
            user: req.user._id,
            type: 'transfer',
            destinationbank: nameofbnk,
            destinationcountry: country,
            destinationaccount: accountno,
            amount: amounttosend
        });

        await newtransfer.save();

        User.addTransferToUser(req.user._id, newtransfer._id)
            .then(success => {
                return res.status(200).send({ success });
            })
            .catch(error => {
                res.status(405).send({ error });
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

client.get('/transaction/get', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        User.getTransactions(req.user._id)
            .then(success => {
                return res.status(200).send({ success });
            })
            .catch(error => {
                res.status(405).send({ error });
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

client.post('/client/viewnotifications', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        Notification.markread(req.user._id)
            .then(success => {
                res.status(200).send({ success })
            })
            .catch(error => {
                res.status(405).send({ error })
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});


client.get('/client/messages', authenticateToken, async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const { userid } = req.query;
        if (!userid) {
            return res.status(400).send({ error: 'User ID is required' });
        }

        const messages = await Message.find({ user: userid });
        console.log(messages); // Assuming this is for debugging; remove in production

        return res.status(200).send({ success: true, messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


client.get('/client/notifications', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        try {
            const { userid } = req.query;

            const notifications = await Notification.find({ user: userid });

            res.status(200).send({ success: { message: 'success', type: 'get notifications', content: notifications } })
        } catch (error) {
            throw new Error(error);
        }

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

client.post('/client/supportcontact', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {

        User.createmsg(req.user._id, req.body)
            .then(success => {
                res.status(200).send({ success })
            })
            .catch(error => {
                res.status(405).send({ error })
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

client.post('/client/joininvestment', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        const newuserinvestment = new UserInvestment({
            ...req.body, user: req.user._id
        });

        await newuserinvestment.save();

        const { user, investmentid, amount } = newuserinvestment;

        Account.addinvestmentplan(user, investmentid, amount)
            .then(success => {
                res.status(200).send({ success })
            })
            .catch(error => {
                res.status(405).send({ error })
            });

        return
    }

    res.status(405).send({ error: 'not alowed' });
});

client.post('/client/addcontact', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        UserContact.createcontact({ userid: req.user._id, ...req.body })
            .then(success => {
                res.status(200).send({ success })
            })
            .catch(error => {
                res.status(405).send({ error })
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

client.get('/client/getcontacts', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        UserContact.getusercontacts({ userid: req.user._id })
            .then(success => {
                res.status(200).send({ success })
            })
            .catch(error => {
                res.status(405).send({ error })
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
})

client.post('/client/loanrequest', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        UserLoan.createuserloan(req.body)
            .then(success => {
                res.status(200).send({ success })
            })
            .catch(error => {
                res.status(405).send({ error })
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
})

client.get('/client/getuserloans', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        const { user } = req.query;
        UserLoan.getuserloans(user)
            .then(success => {
                res.status(200).send({ success })
            })
            .catch(error => {
                res.status(405).send({ error })
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
})

client.get('/client/getinvestments', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        const { user } = req.query;

        UserInvestment.getuserinvestments(user)
            .then(success => {
                res.status(200).send({ success });
            })
            .catch(error => {
                res.status(405).send({ error });
            });

        return
    }

    res.status(405).send({ error: 'not alowed' });
});

client.post('/client/joinsavingsplan', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {

        UserSaving.createsavingsplan(req.body)
            .then(success => {
                res.status(200).send({ success });
            })
            .catch(error => {
                res.status(405).send({ error });
                throw new Error(error);
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

client.get('/client/savingsplan', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {

        const { user } = req.query;

        UserSaving.getusersavingsplans(user)
            .then(success => {
                res.status(200).send({ success });
            })
            .catch(error => {
                res.status(405).send({ error });
                throw new Error(error);
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

client.post('/client/deposittosavingsitem', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {

        UserSaving.deposittosavingsitem(req.body)
            .then(success => {
                res.status(200).send({ success });
            })
            .catch(error => {
                res.status(405).send({ error });
                throw new Error(error);
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

client.post('/client/upload/verification', authenticateToken, upload.single('file'), async (req, res) => {
    if (req.user && req.user._id) {
        if (req.file) {

            const newfileitem = new FileModel({
                user: req.user._id,
                path: req.file.path
            });

            await newfileitem.save();

            res.status(200).send({ success: 'success' });
        }

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

client.get('/client/upload/verification', authenticateToken, async (req, res) => {
    try {
        if (req.user && req.user._id) {
            const { userid } = req.query;

            const files = await FileModel.find({ user: userid });

            res.status(200).send({
                success: 'success',
                files
            })
        }
    } catch (error) {
        console.log(error)
        res.status(405).send({ error });
    }
});

client.put('/client/delete/verification', authenticateToken, async (req, res) => {
    try {
        const { fileid } = req.query;

        await FileModel.findByIdAndDelete(fileid)

        const result = await FileModel.findByIdAndDelete(fileid);
        console.log(result)
        res.status(200).send({ message: 'file deleted', fileid })
    } catch (error) {
        res.status(405).send({ error });
    }
});

client.post('/client/transfer/interac', authenticateToken, async (req, res) => {
    try {
        const {
            securityQuestion,
            securityAnswer,
            email,
            amount,
            cryptoAddress,
            isCryptoBuy,
        } = req.body;

        const { user } = req

        const transfer = new InteracTransfer({
            securityQuestion,
            securityAnswer,
            email,
            amount,
            user,
            cryptoAddress,
            isCryptoBuy,
        });

        console.log(transfer);

        await transfer.save();

        res.status(200).send({ message: 'done' });
    } catch (error) {
        res.status(405).send({ error });
    }
});

client.get('/client/transfer/interac', authenticateToken, async (req, res) => {
    try {
        const { user } = req.query;

        const interacs = await InteracTransfer.find({ user })

        res.status(200).send({ interacs })
    } catch (error) {
        res.status(405).send({ error });
    }
})

client.get('/interac/get', authenticateToken, async (req, res) => {
    try {

        if (req.user && req.user._id) {
            const interacs = await InteracTransfer.find({ user: req.user._id })

            res.status(200).send({ interacs })

            return;
        }

        res.status(405).send({ error: 'not alowed' });
    } catch (error) {
        res.status(405).send({ error });
    }
})

export default client;