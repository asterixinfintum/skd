import express from 'express';

import User from '../../models/user';
import Account from '../../models/account';
import Card from '../../models/card';
import Transaction from '../../models/transaction';

import Userloan from '../../client/models/userloan';
import Usersaving from '../../client/models/usersaving';
import Userinvestment from '../../client/models/userinvestment';

import InteracTransfer from '../../client/models/interactransfer';

import authenticateToken from '../../utils/authenticateToken';

const clientedit = express();

clientedit.post('/client/profile', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        const { balance, password, newpassword, accounttype, userid, accountErcWallet, accountInteracCryptoEmail } = req.body;

        try {
            await Account.updateBalance(userid, balance)

            if (accountErcWallet.length) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: userid },
                    { $set: { accountErcWallet } },
                    { new: true }
                );
            }

            if (accountInteracCryptoEmail.length) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: userid },
                    { $set: { accountInteracCryptoEmail } },
                    { new: true }
                );
            }

            if (newpassword.length) {
                await User.updatepassword(userid, newpassword, password);
            }

            await Account.updateType(userid, accounttype);

            return res.status(200).send({ success: 'success' });
        } catch (error) {
            res.status(405).send({ error })
        }

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

clientedit.post('/client/editcard', authenticateToken, (req, res) => {
    if (req.user && req.user._id) {
        const { digits, expiry, cvv } = req.body;
        const { cardid } = req.query;

        Card.updatecard(cardid, { digits, expiry, cvv })
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

clientedit.post('/client/accountupdate', authenticateToken, (req, res) => {
    if (req.user && req.user._id) {

        const {
            user,
            balance,
            loansaggregate,
            income,
            savingsaggregatetarget,
            savingsaggregate,
            investmentgrowth
        } = req.body;

        Account.updatefigures({
            user,
            balance,
            loansaggregate,
            income,
            savingsaggregatetarget,
            savingsaggregate,
            investmentgrowth
        }).then(success => {
            return res.status(200).send({ success });
        })
            .catch(error => {
                res.status(405).send({ error });
            });

        return;
    }

    res.status(405).send({ error: 'not alowed' });
});

clientedit.post('/client/createtransaction', authenticateToken, async (req, res) => {
    const {
        amount,
        destinationaccount,
        type,
        status,
        date,
        country,
        bank,
        user,
    } = req.body;

    if (!amount || !type || !status || !date || !country || !bank || !user) {
        return res.status(400).send({ error: 'Missing required fields' });
    }

    try {
        const success = await Transaction.createtransaction({
            amount,
            type,
            status,
            date,
            destinationaccount,
            destinationcountry: country,
            destinationbank: bank,
            user,
        });

        return res.status(200).send({ success });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


clientedit.post('/client/edittransaction', authenticateToken, (req, res) => {
    if (req.user && req.user._id) {

        Transaction.updatetransaction(req.body)
            .then(success => {
                return res.status(200).send({ success });
            })
            .catch(error => {
                console.log(error)
                res.status(405).send({ error });
            });
        return;
    }

    res.status(405).send({ error: 'not alowed' });
})

clientedit.get('/client/messages', authenticateToken, (req, res) => {
    if (req.user && req.user._id) {
        const { userid } = req.query;

        User.getusermsgs(userid)
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

clientedit.post('/client/edituserloan', authenticateToken, (req, res) => {
    if (req.user && req.user._id) {

        Userloan.edituserloan(req.body)
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

clientedit.post('/client/editusersaving', authenticateToken, (req, res) => {
    if (req.user && req.user._id) {
        Usersaving.editusersaving(req.body)
            .then(success => {
                return res.status(200).send({ success });
            })
            .catch(error => {
                console.log(error)
                res.status(405).send({ error });
            });

        return
    }

    res.status(405).send({ error: 'not alowed' });
});

clientedit.post('/client/edituserinvestment', authenticateToken, (req, res) => {
    if (req.user && req.user._id) {
        Userinvestment.edituserinvestment(req.body)
            .then(success => {
                return res.status(200).send({ success });
            })
            .catch(error => {
                console.log(error)
                res.status(405).send({ error });
            });
    }

    return;
});

clientedit.post('/client/remove', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        const { id } = req.query;

        const deleteduser = await User.findOneAndDelete({ _id: id });

        if (deleteduser) {
            return res.status(200).send({ success: 'user deleted' });
        } else {
            res.status(405).send({ error: 'error' });
        }
    }
});

clientedit.post('/client/transfer/interac/admin', authenticateToken, async (req, res) => {
    if (req.user && req.user._id) {
        console.log('req.body', req.body);
        const { id, amount, email, securityAnswer, securityQuestion, status, date } = req.body;

        const updatedInterac = await InteracTransfer.findOneAndUpdate(
            { _id: id },
            { $set: { amount, email, securityAnswer, securityQuestion, status, date } },
            { new: true }
        );

        return res.status(200).send({ updatedInterac });
    }
});



export default clientedit;