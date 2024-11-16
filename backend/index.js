const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const { Client } = require('pg');
const jwt = require('jsonwebtoken')

dotenv.config()
const client = new Client({
    connectionString: process.env.PGURI
})
client.connect()

const authRoutes = require('./auth')

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)


port = process.env.PORT || 3000

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'No token provided'})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(err){
            return res.status(403).json({error: 'Invalid token'})
        }
        req.user = decoded;
        next()
    })
}

//GET ALL USERS
app.get('/api', async (_request, response) => {
    const {rows} = await client.query(
        'SELECT * FROM userinformation'
    )
    response.send(rows)
})

app.use(express.static(path.join(path.resolve(), 'dist')))
app.listen(port, () => {
    console.log(`Redo på http://localhost:${port}/`)
})

//GET SINGLE USER
app.get('/api/user/:id', authenticateToken, async (req, res) => {
    const userId = req.params.id;
    const authenticatedUserId = String(req.user.userId);

    if(userId !== authenticatedUserId){
        return res.status(403).json({error: 'Not correct user'})
    }
    try {
        const result = await client.query(
            'SELECT * FROM userinformation WHERE id = $1;',
            [userId]
        )
        if (result.rows.length > 0) {
            res.send(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }catch (error) {
        console.error(error)
        res.status(500).json({error: 'User not found'})
    }
})

//UPDATE
app.put ('/api/user/:id', async (request, response) => {
    const userId = request.params.id;
    const {firstname, lastname, company, professionalrole, area, webbaddress, phonenumber, email} = request.body
try{
    const result = await client.query(
        'UPDATE userinformation SET firstname = $1, lastName = $2, company = $3, professionalrole = $4, area = $5, webbaddress = $6, phonenumber = $7, email = $8 WHERE id = $9 RETURNING *;',
        [firstname, lastname, company, professionalrole, area, webbaddress, phonenumber, email, userId]
    );
    response.status(200).json(result.rows[0]);
} catch (error) {
    console.error(error);
    response.status(500).json({error: 'Failed to update user'})
}

})

//CREATE A NEW USER
app.post('/api/user', async (request, response) => {
    const { firstname, lastname, password, company, professionalrole, area, webbaddress, phonenumber, email } = request.body;

    try {
        const result = await client.query(
            'INSERT INTO userinformation (firstname, lastname, password, company, professionalrole, area, webbaddress, phonenumber, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;',
            [firstname, lastname, password, company, professionalrole, area, webbaddress, phonenumber, email]
        );

        response.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Failed to create user' });
    }
});


// DELETE
app.delete('/api/user/:id', authenticateToken, async (req, res) => {
    const userId = req.params.id;
    const authenticatedUserId = String(req.user.userId);
    const { password } = req.body;

    if (userId !== authenticatedUserId) {
        return res.status(403).json({ error: 'Not authorized to delete this user' });
    }

    try {
        const result = await client.query(
            'SELECT * FROM userinformation WHERE id = $1;',
            [userId]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const deleteResult = await client.query(
            'DELETE FROM userinformation WHERE id = $1 RETURNING *;',
            [userId]
        );

        if (deleteResult.rows.length > 0) {
            res.status(200).json({ message: 'User deleted successfully', user: deleteResult.rows[0] });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }

   
});

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
});

//I backendmappen: 
// Skapa .env fil 
// skriv i .env filen: PGURI=postgres://postgres:supersecretpassword@host.docker.internal:5432/postgresdb
// OBS! byt ut password mot ditt lösenord samt user till din user
