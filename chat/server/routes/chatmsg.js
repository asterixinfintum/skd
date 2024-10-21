import express from 'express';

import ChatMessage from '../models/chatmsg';

import { authenticateToken } from '../utils';

const chatmsgroute = express();

chatmsgroute.get('/userchatmsgs', authenticateToken, async (req, res) => {
    try {
        if (req.user && req.user._id) {
            const { user } = req.query;
            const chatMsgs = await ChatMessage.find({ user });

            res.status(200).send({ chatMsgs });
            return;
        }

        res.status(405).send({ error: 'not alowed' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


chatmsgroute.get('/agentchatmsgs', authenticateToken, async (req, res) => {

})

export default chatmsgroute;