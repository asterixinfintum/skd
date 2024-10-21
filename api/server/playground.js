clientedit.post('/client/profile', authenticateToken, async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    const { balance, password, newpassword, accounttype, userid } = req.body;

    try {
        await Account.updateBalance(userid, balance);

        if (newpassword && newpassword.length >= MIN_PASSWORD_LENGTH) {
            await User.updatepassword(userid, newpassword, password);
        } else if (newpassword) {
            throw new Error('Password too short');
        }

        await Account.updateType(userid, accounttype);

        return res.status(200).send({ success: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating client profile:', error);
        const statusCode = error.isClientError ? 400 : 500;
        res.status(statusCode).send({ error: error.message });
    }
});