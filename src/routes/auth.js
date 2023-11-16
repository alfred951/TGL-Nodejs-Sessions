const express = require('express');
const router = express.Router();
const userService = require('../services/user');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userService.login(username, password);
        req.session.userId = user.id;
        res.send('login successful')
    } catch (err) {
        res.status(401).send('Invalid Credentials')
    }
})

router.post('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Unable to log out')
        }
        res.send('Logout successful');
    })
})

module.exports = router;