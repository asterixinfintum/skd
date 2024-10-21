import express from 'express';

import User from '../../models/user';

import authenticateToken from '../../utils/authenticateToken';

const login = express();

login.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.login({ email, password })
        .then(success => {
            res.status(200).send({ success })
        })
        .catch(error => {
            console.log(error)
            res.status(405).send({ error })
        })
});

export default login