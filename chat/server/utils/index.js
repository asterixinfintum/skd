import jwt from 'jsonwebtoken';

import ChatMessage from '../models/chatmsg';
import User from '../models/user';

function processTime(time) {
    if (time) {
        const date = new Date(time);
        return date.toLocaleString("en-US", {
            weekday: "long", // "Monday"
            year: "numeric", // "2024"
            month: "long", // "May"
            day: "numeric", // "19"
            hour: "2-digit", // "11"
            minute: "2-digit", // "36"
            second: "2-digit", // "17"
            hour12: true, // "PM"
        });
    }
}

async function createMsg({ chatval, time, from }, userid) {

    try {
        const newChatMessage = new ChatMessage({
            user: userid,
            message: chatval,
            time: processTime(time),
            from: from ? from : null
        });

        const savedChatMessage = await newChatMessage.save();

        return savedChatMessage;
    } catch (error) {
        throw error;
    }
}

async function setUserState(userid) {
    try {
        if (userid) {
            const user = await User.findOne({ _id: userid });

            if (user) {
                return user;
            }
        }
    } catch (error) {
        throw error;
    }
}

async function setUserStateOffline(userid) {
    try {
        if (userid) {
            const user = await User.findOne({ _id: userid });

            if (user) {
                user.online = false;

                await user.save();

                return user;
            }
        }
    } catch (error) {
        throw error;
    }
}

async function setMsgAsSeen(msgs) {
    try {
        const promises = msgs.map(async ({ _id }) => {
            const msg = await ChatMessage.findOne({ _id });

            if (msg) {
                msg.seen = true;
                await msg.save();
            }
        });

        await Promise.all(promises);
    } catch (error) {
        throw error;
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.secretKeyJWT, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

export { createMsg, setUserState, setUserStateOffline, authenticateToken, setMsgAsSeen };