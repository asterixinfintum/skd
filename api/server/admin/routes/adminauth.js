import express from 'express';
const { formatDistanceToNow } = require('date-fns');


import Admin from '../models/admin';
import User from '../../models/user';
import Account from '../../models/account';
import Card from '../../models/card';
import Transaction from '../../models/transaction';

import authenticateToken from '../../utils/authenticateToken';

const adminauth = express();

adminauth.get('/currentadmin', authenticateToken, async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ error: 'Unauthorized access' });
    }

    const { id } = req.query;

    if (req.user._id !== id) {
        return res.status(403).send({ error: 'Forbidden access' });
    }

    try {
        const foundAdmin = await Admin.findOne({ _id: id });

        if (!foundAdmin) {
            return res.status(404).send({ error: 'Admin not found' });
        }

        return res.status(200).send({ success: { message: 'success', type: 'admin auth', content: foundAdmin } });
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
});

adminauth.post('/admin/create', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    try {
        const success = await Admin.register({ username, password });
        res.status(200).send({ success });
    } catch (error) {
        console.error('Error creating admin:', error);
        // Determine if it's a client error (like duplicate username) or a server error
        const statusCode = error.isClientError ? 400 : 500;
        res.status(statusCode).send({ error: error.message });
    }
});

adminauth.post('/admin/signin', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ error: 'Username and password are required' });
    }

    try {
        const success = await Admin.login({ username, password });
        res.status(200).send({ success });
    } catch (error) {
        console.error('Error during admin sign-in:', error);
        // Here, you might want to provide a generic error message for security reasons
        res.status(401).send({ error: 'Invalid username or password' });
    }
});

adminauth.get('/admin/getusers', authenticateToken, async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({
            error: 'Unauthorized'
        });
    }

    try {
        const administrator = await Admin.findOne({ _id: req.user._id });

        if (!administrator || !administrator.admin) {
            return res.status(403).send({
                error: 'Forbidden: Insufficient privileges'
            });
        }

        const { currentPageQuery, searchquery } = req.query;

        //console.log(currentPageQuery, searchquery, 'checker');

        if (searchquery.length) {
            const useritems = await User.find({
                $or: [
                    { firstname: { $regex: searchquery, $options: 'i' } },
                    { lastname: { $regex: searchquery, $options: 'i' } },
                    { email: { $regex: searchquery, $options: 'i' } }
                ]
            }).select('_id firstname lastname email phonenumber account');

            const totalItems = useritems.length;
            const itemsPerPage = 30;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            let currentPage = Math.max(currentPageQuery, 1);
            if (totalPages > 0) {
                currentPage = Math.min(currentPage, totalPages);
            }
            const skip = (currentPage - 1) * itemsPerPage;
            const remainingItems = Math.max(totalItems - (currentPage * itemsPerPage), 0);
            const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

            const useritemstwo = await User.find({
                $or: [
                    { firstname: { $regex: searchquery, $options: 'i' } },
                    { lastname: { $regex: searchquery, $options: 'i' } },
                    { email: { $regex: searchquery, $options: 'i' } }
                ]
            }).select('_id firstname lastname email phonenumber account, online').skip(skip).limit(itemsPerPage);

            const users = await Promise.all(useritemstwo.map(async user => {
                //console.log(user, 'here')
                const [account, cards] = await Promise.all([
                    Account.findOne({ _id: user.account }),
                    Card.find({ user: user._id })
                ]);
                return { details: user, account, cards };
            }));

            // console.log(users, totalPages, currentPage, remainingItems, pageNumbers )

            // res.send({ users, totalPages, currentPage, remainingItems, pageNumbers });

            res.status(200).send({
                success: {
                    message: 'success',
                    type: 'platform users',
                    content: users,
                    totalPages,
                    remainingItems,
                    pageNumbers,
                    currentPage,
                    totalItems
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Internal server error' });
    }
});

/*adminauth.get('/admin/getusers', authenticateToken, async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const administrator = await Admin.findOne({ _id: req.user._id });

        if (!administrator || !administrator.admin) {
            return res.status(403).send({ error: 'Forbidden: Insufficient privileges' });
        }

        const { currentPageQuery } = req.query;

        if (currentPageQuery) {
            const totalItems = await User.countDocuments();
            const itemsPerPage = 10;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            let currentPage = Math.max(currentPageQuery, 1);

            if (totalPages > 0) {
                currentPage = Math.min(currentPage, totalPages);
            }

            const skip = (currentPage - 1) * itemsPerPage;
            const remainingItems = Math.max(totalItems - (currentPage * itemsPerPage), 0);

            const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

            const useritems = await User.find().select('_id firstname lastname email phonenumber account').skip(skip).limit(itemsPerPage);

            const users = await Promise.all(useritems.map(async user => {
                const [account, cards] = await Promise.all([
                    Account.findOne({ _id: user.account }),
                    Card.find({ user: user._id })
                ]);

                return {
                    details: user,
                    account,
                    cards
                };
            }));

            res.status(200).send({
                success: {
                    message: 'success',
                    type: 'platform users',
                    content: users,
                    totalPages,
                    remainingItems,
                    pageNumbers,
                    totalItems
                }
            });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});*/

adminauth.get('/admin/getuser', authenticateToken, async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const administrator = await Admin.findOne({ _id: req.user._id });

        if (!administrator || !administrator.admin) {
            return res.status(403).send({ error: 'Forbidden: Insufficient privileges' });
        }

        const { userid } = req.query;
        if (!userid) {
            return res.status(400).send({ error: 'User ID is required' });
        }

        const user = await User.findOne({ _id: userid });
        
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const [account, cards] = await Promise.all([
            Account.findOne({ _id: user.account }),
            Card.find({ user: user._id })
        ]);

        console.log(user, 'user')

        const result = {
            details: user,
            account,
            cards,
            lastOnline: user.lastSeen === null ? 'not available yet' : formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true })
        };

        res.status(200).send({
            success: {
                message: 'success',
                type: 'platform user',
                content: result
            }
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


adminauth.get('/admin/getusertxns', authenticateToken, async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const administrator = await Admin.findOne({ _id: req.user._id });

        if (!administrator || !administrator.admin) {
            return res.status(403).send({ error: 'Forbidden: Insufficient privileges' });
        }

        const { userid } = req.query;
        if (!userid) {
            return res.status(400).send({ error: 'User ID is required' });
        }

        const transactions = await User.getTransactions(userid);
        res.status(200).send({ success: transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


export default adminauth;