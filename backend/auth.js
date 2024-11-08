// auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Client } = require('pg'); 

const router = express.Router();

const client = new Client({
    connectionString: process.env.PGURI,
});
client.connect();

const SECRET_KEY = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await client.query('SELECT * FROM userInformation WHERE email = $1;', [email]);
        const user = result.rows[0];
            console.log("Queried user:", user);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

